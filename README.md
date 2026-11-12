# GridOptima — Smart Electricity Distribution Network Optimization

**GridOptima** is a Design and Analysis of Algorithms (DAA) mini project that models electricity distribution as a weighted, undirected graph and determines a Minimum Spanning Tree (MST) using **Prim's and Kruskal's algorithms**, implemented in C.

## 🌐 Live Website

**[Open GridOptima](https://gridoptima-okfn.onrender.com/)**

The application is deployed using Render. The free hosting instance may take up to a minute to wake up after a period of inactivity.

## 💻 Technology Stack

- **C:** Implementation of Prim's and Kruskal's algorithms.
- **Python + Flask:** Backend API that compiles and executes the C programs.
- **HTML, CSS, JavaScript, SVG:** Interactive website and graph visualization.
- **Render:** Cloud hosting and deployment.
- **GitHub:** Source code management.

## ✨ Features

- Interactive electricity network builder.
- Add buildings (vertices) and possible power-line connections (edges).
- Assign construction costs to connections.
- Execute Prim's and Kruskal's algorithms.
- Visualize the resulting Minimum Spanning Tree.
- View selected edges, total minimum cost, execution time, and algorithm steps.
- Compare the results of both algorithms on the same network.

## ⚙️ Local Requirements

1. Windows 10/11 or another operating system.
2. Python 3.10 or later.
3. GCC compiler available as `gcc` in the terminal PATH.
4. Internet connection for initial dependency installation and Google Fonts.

For Windows, MinGW-w64 is a common GCC option.

## 🚀 Run Locally on Windows

1. Install Python 3.10+ and enable **Add Python to PATH** during installation.
2. Install MinGW-w64 GCC and add its `bin` directory to PATH.
3. Double-click `run_windows.bat`.
4. Wait for Flask to start.
5. Open **http://127.0.0.1:5000** in Chrome.
6. Keep the terminal window open while using the application.

Close the server using `Ctrl + C` when finished.

## Run Manually

From the project root directory:

```bash
python -m pip install -r requirements.txt
python backend/app.py
```

Then open:

```text
http://127.0.0.1:5000
```

## 📖 How to Use

1. Open the GridOptima website.
2. The application loads a sample network containing six locations.
3. Add buildings and possible connections using the Network Builder.
4. Enter a non-negative integer construction cost for each connection.
5. Select and execute Prim's or Kruskal's algorithm.
6. Inspect the highlighted MST, selected edges, total cost, execution time, and algorithm steps.
7. Run the other algorithm on the same graph to compare results.
8. Use **Reset Sample** to restore the example network.

## 📊 Input Model

- Each building represents a vertex.
- Each possible power-line connection represents an undirected weighted edge.
- Connection costs are non-negative integers in user-defined units (for example, ₹ lakh).
- Sample weights are illustrative and are not actual construction estimates.
- The graph must be connected to have a spanning tree.
- Maximum supported input: 100 vertices and 5,000 edges.

## 🧠 Algorithms Implemented

### 1. Prim's Algorithm

Prim's algorithm constructs an MST by repeatedly selecting the minimum-cost edge connecting the growing tree to an unvisited vertex.

- Approach: Greedy
- Implementation: C
- Time Complexity: O(V²)
- Space Complexity: O(V²)

### 2. Kruskal's Algorithm

Kruskal's algorithm sorts all edges in non-decreasing order of weight and selects edges that do not form a cycle. It uses Disjoint Set Union (Union-Find) with path compression and union by rank.

- Approach: Greedy
- Implementation: C
- Time Complexity: O(E log E)
- Auxiliary Space Complexity: O(V + E)

## 🧪 Sample Data and Expected MST Cost

**Locations:**

| Vertex | Location |
|---|---|
| A | Main Substation |
| B | Academic Block |
| C | Library |
| D | Hostel Block |
| E | Canteen |
| F | Administration Block |

**Connections:**

| Edge | Cost |
|---|---:|
| A–B | 4 |
| A–C | 3 |
| B–C | 2 |
| B–D | 5 |
| C–D | 3 |
| C–E | 6 |
| D–E | 4 |
| D–F | 7 |
| E–F | 2 |

**One possible Minimum Spanning Tree:**

- B–C = 2
- E–F = 2
- A–C = 3
- C–D = 3
- D–E = 4

**Minimum Total Cost = 14**

Both algorithms should return a minimum cost of **14** for this sample network. Different edge choices may occur when multiple MSTs have equal minimum costs.

## 🔍 Important Implementation Note

The C programs are the authoritative implementations of Prim's and Kruskal's algorithms.

The Flask backend compiles the relevant `.c` file using GCC and executes it by passing graph data through standard input. JavaScript handles the interface and visualization; it does not implement the MST algorithms.

## ⚠️ Limitations and Future Scope

The project uses a simplified graph model. Real-world electricity distribution planning also requires consideration of:

- Voltage and capacity constraints.
- Reliability and outage resilience.
- Geographic distance and terrain.
- Safety and regulatory requirements.

**Possible future enhancements:**

- Geographic map integration.
- Electricity load and capacity constraints.
- Outage resilience analysis.
- Exportable project reports.
- Persistent graph storage.

## 🛠️ Troubleshooting

- **GCC not found:** Install MinGW-w64 and add its `bin` folder to PATH.
- **Python not found:** Install Python and enable Add Python to PATH.
- **Flask import error:** Run `python -m pip install -r requirements.txt`.
- **Local website cannot connect:** Ensure Flask is running and open `http://127.0.0.1:5000`.
- **Cloud website takes time to load:** The free Render instance may have gone to sleep. Wait briefly and refresh the page.
- **Browser shows an error:** Check the Render application logs or local terminal for errors.

---

**Project:** GridOptima — Smart Electricity Distribution Network Optimization  
**Domain:** Design and Analysis of Algorithms (DAA)  
**Core Concepts:** Minimum Spanning Tree, Greedy Algorithms, Graphs, Prim's Algorithm, Kruskal's Algorithm