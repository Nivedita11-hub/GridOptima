# GridOptima — Smart Electricity Distribution Network Optimization

GridOptima is a **Design and Analysis of Algorithms (DAA) mini project** that models an electricity distribution network as a weighted, undirected graph and determines its Minimum Spanning Tree (MST) using **Prim's and Kruskal's algorithms**, implemented in C.

The project provides an interactive web interface where users can create electricity networks, assign connection costs, execute both algorithms, and visualize the resulting minimum-cost network.

## 🌐 Live Website

**[Open GridOptima](https://gridoptima-okfn.onrender.com/)**

*Note: The application is hosted on Render's free tier. After a period of inactivity, the server may take up to a minute to wake up.*

## ✨ Features

- Interactive electricity network builder.
- Add buildings (vertices) and possible power-line connections (edges).
- Assign construction costs to connections.
- Execute Prim's and Kruskal's algorithms.
- Visualize the resulting Minimum Spanning Tree.
- View selected edges and total minimum cost.
- Display execution time and algorithm steps.
- Compare both algorithms on the same network.
- Includes a predefined sample electricity network.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| C | Implementation of Prim's and Kruskal's algorithms |
| Python | Backend execution and integration |
| Flask | Backend API and web server |
| HTML | Website structure |
| CSS | Styling and layout |
| JavaScript | User interactions and frontend logic |
| SVG | Graph visualization |
| Render | Cloud hosting and deployment |
| GitHub | Source code management |

## ⚙️ Requirements

To run GridOptima locally, you need:

1. Windows 10/11 or another operating system.
2. Python 3.10 or later.
3. GCC compiler available as `gcc` in the terminal PATH.
4. Internet connection for initial dependency installation and Google Fonts.

For Windows, **MinGW-w64** is a common option for installing GCC.

## 🚀 Run Locally on Windows

### Method 1: Using the Windows Launcher

1. Install Python 3.10+ and enable **Add Python to PATH** during installation.
2. Install MinGW-w64 GCC and add its `bin` directory to the system PATH.
3. Open the GridOptima project folder.
4. Double-click `run_windows.bat`.
5. Wait for the Flask server to start.
6. Open the following address in your browser:

   `http://127.0.0.1:5000`

7. Keep the terminal window open while using the application.

To stop the server, press `Ctrl + C` in the terminal.

### Method 2: Running Manually

Open a terminal in the project root directory and execute:

```bash
python -m pip install -r requirements.txt
python backend/app.py
```

Then open:

`http://127.0.0.1:5000`

Keep the terminal running while using the application.

## 📖 How to Use

1. Open the GridOptima website.
2. The application loads a sample network containing six locations.
3. Add buildings and possible connections using the Network Builder.
4. Enter a non-negative integer construction cost for each connection.
5. Select and execute Prim's or Kruskal's algorithm.
6. Inspect the highlighted MST, selected edges, total cost, execution time, and algorithm steps.
7. Run the other algorithm on the same network to compare results.
8. Use **Reset Sample** to restore the predefined example network.

## 📊 Input Model

GridOptima represents an electricity distribution network using a weighted, undirected graph.

- **Vertices (V):** Buildings or substations.
- **Edges (E):** Possible power-line connections between locations.
- **Weights:** Construction costs associated with each connection.
- **Graph Type:** Weighted and undirected.
- **Input Costs:** Non-negative integers in user-defined units (for example, ₹ lakh).
- **Maximum Supported Input:** 100 vertices and 5,000 edges.

A connected graph is required to construct a spanning tree.

*Note: The sample weights are illustrative and do not represent actual electricity infrastructure construction estimates.*

## 🧠 Algorithms Implemented

### 1. Prim's Algorithm

Prim's algorithm constructs a Minimum Spanning Tree by repeatedly selecting the minimum-cost edge that connects the growing tree to an unvisited vertex.

- **Approach:** Greedy
- **Implementation:** C
- **Data Structure:** Adjacency matrix
- **Time Complexity:** O(V²)
- **Space Complexity:** O(V²)

### 2. Kruskal's Algorithm

Kruskal's algorithm sorts all edges in non-decreasing order of weight and selects edges that do not form a cycle.

It uses the **Disjoint Set Union (DSU)** data structure, also known as Union-Find, with path compression and union by rank.

- **Approach:** Greedy
- **Implementation:** C
- **Data Structure:** Edge list and Disjoint Set Union
- **Time Complexity:** O(E log E)
- **Auxiliary Space Complexity:** O(V + E)

Where:
- V = Number of vertices.
- E = Number of edges.

## 🧪 Sample Data and Expected MST Cost

The predefined sample network contains six locations.

### Locations

| Vertex | Location |
|---|---|
| A | Main Substation |
| B | Academic Block |
| C | Library |
| D | Hostel Block |
| E | Canteen |
| F | Administration Block |

### Possible Connections

| Edge | Construction Cost |
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

### One Possible Minimum Spanning Tree

| Selected Edge | Cost |
|---|---:|
| B–C | 2 |
| E–F | 2 |
| A–C | 3 |
| C–D | 3 |
| D–E | 4 |
| **Total Minimum Cost** | **14** |

**Expected Result:** Both Prim's and Kruskal's algorithms should produce a minimum total cost of **14** for the sample network.

Different edge selections may occur when multiple MSTs have the same minimum total cost.

## 🔍 Important Implementation Details

The C programs are the authoritative implementations of Prim's and Kruskal's algorithms.

The Flask backend:

1. Receives graph data from the frontend.
2. Compiles the relevant C source file using GCC.
3. Executes the compiled program.
4. Passes graph data through standard input.
5. Returns the algorithm's output to the frontend.

JavaScript manages user interactions, API communication, and graph visualization. It does not implement the MST algorithms.

## ⚠️ Limitations and Future Scope

GridOptima uses a simplified graph model for demonstrating Minimum Spanning Tree algorithms.

Real-world electricity distribution planning requires additional considerations, including:

- Voltage and power capacity constraints.
- Electricity demand and load distribution.
- Reliability and outage resilience.
- Geographic distance and terrain.
- Safety and regulatory requirements.

### Possible Future Enhancements

- Geographic map integration.
- Electricity load and capacity analysis.
- Outage resilience analysis.
- Exportable project reports.
- Persistent graph storage.
- More advanced network optimization techniques.

## 🛠️ Troubleshooting

| Problem | Possible Solution |
|---|---|
| GCC not found | Install MinGW-w64 and add its `bin` directory to PATH. |
| Python not found | Install Python and enable Add Python to PATH. |
| Flask import error | Run `python -m pip install -r requirements.txt`. |
| Local website cannot connect | Ensure Flask is running and open `http://127.0.0.1:5000`. |
| Cloud website takes time to load | Wait for the Render free instance to wake up, then refresh. |
| Browser displays an error | Check the local terminal or Render application logs. |

---

**Project:** GridOptima — Smart Electricity Distribution Network Optimization  
**Domain:** Design and Analysis of Algorithms (DAA)  
**Core Concepts:** Graphs, Greedy Algorithms, Minimum Spanning Tree, Prim's Algorithm, Kruskal's Algorithm