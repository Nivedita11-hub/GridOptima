from flask import Flask, request, jsonify, send_from_directory
from pathlib import Path
import subprocess
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
BACKEND = Path(__file__).resolve().parent
ALGO_DIR = BACKEND / "algorithms"
IS_WINDOWS = sys.platform.startswith("win")
EXT = ".exe" if IS_WINDOWS else ""
app = Flask(__name__, static_folder=str(FRONTEND), static_url_path="")

def compile_program(source_name):
    source = ALGO_DIR / source_name
    output = ALGO_DIR / (source.stem + EXT)
    if not source.exists():
        raise FileNotFoundError(f"Missing C source: {source}")
    command = ["gcc", "-std=c11", "-O2", str(source), "-o", str(output)]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr or "C compilation failed. Check GCC installation.")
    return output

def normalize_graph(data):
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    if not isinstance(nodes, list) or not isinstance(edges, list):
        raise ValueError("Nodes and edges must be arrays.")
    if not 1 <= len(nodes) <= 100:
        raise ValueError("The graph must contain between 1 and 100 buildings.")
    if len(edges) > 5000:
        raise ValueError("A maximum of 5000 connections is supported.")
    names = []
    for node in nodes:
        name = str(node.get("name", "")).strip()
        if not name or len(name) > 40:
            raise ValueError("Every building needs a name of 1 to 40 characters.")
        names.append(name)
    clean_edges = []
    for edge in edges:
        try:
            u, v, w = int(edge["u"]), int(edge["v"]), int(edge["weight"])
        except (KeyError, TypeError, ValueError):
            raise ValueError("Each connection needs valid endpoints and an integer cost.")
        if u < 0 or v < 0 or u >= len(nodes) or v >= len(nodes) or u == v:
            raise ValueError("A connection has an invalid endpoint.")
        if w < 0 or w > 100000000:
            raise ValueError("Connection costs must be between 0 and 100,000,000.")
        clean_edges.append((u, v, w))
    return len(nodes), clean_edges

@app.get("/")
def home():
    return send_from_directory(FRONTEND, "index.html")

@app.get("/api/health")
def health():
    return jsonify({"status": "GridOptima backend is running"})

@app.post("/api/run")
def run_algorithm():
    try:
        data = request.get_json(force=True)
        algorithm = data.get("algorithm", "").lower()
        if algorithm not in ("prim", "kruskal"):
            return jsonify({"ok": False, "error": "Choose Prim or Kruskal."}), 400
        n, edges = normalize_graph(data)
        source = "prim.c" if algorithm == "prim" else "kruskal.c"
        executable = compile_program(source)
        input_text = f"{n} {len(edges)}\n" + "".join(f"{u} {v} {w}\n" for u, v, w in edges)
        command = [str(executable)]
        result = subprocess.run(command, input=input_text, capture_output=True, text=True, timeout=5)
        if result.returncode != 0:
            return jsonify({"ok": False, "error": result.stderr or "Algorithm execution failed."}), 500
        output = json.loads(result.stdout)
        if not output.get("ok"):
            return jsonify(output), 400
        output["algorithm"] = algorithm
        return jsonify(output)
    except subprocess.TimeoutExpired:
        return jsonify({"ok": False, "error": "Algorithm execution timed out."}), 500
    except FileNotFoundError:
        return jsonify({"ok": False, "error": "GCC was not found. Install MinGW-w64/GCC and add its bin folder to PATH."}), 500
    except (ValueError, RuntimeError, json.JSONDecodeError) as exc:
        return jsonify({"ok": False, "error": str(exc)}), 400
    except Exception as exc:
        return jsonify({"ok": False, "error": f"Unexpected server error: {exc}"}), 500

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"GridOptima is starting on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)