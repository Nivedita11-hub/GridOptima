# GridOptima — Smart Electricity Distribution Network Optimization

A DAA mini project that models electricity distribution as a weighted, undirected graph and finds a Minimum Spanning Tree (MST) using **Prim's** and **Kruskal's** algorithms implemented in **C**.

## Technology
- C: Prim's and Kruskal's algorithms
- Python + Flask: local API that compiles and executes the C programs
- HTML, CSS, JavaScript, SVG: interactive website and graph visualization

## Requirements
1. Windows 10/11 (launcher provided), or a system with Python 3.10+ and GCC.
2. GCC compiler available as `gcc` in the terminal PATH (MinGW-w64 is a common Windows option).
3. Internet connection on first launch to install Flask and load Google Fonts. The app itself runs locally.

## Run on Windows
1. Install Python 3.10+ and select **Add Python to PATH** during installation.
2. Install MinGW-w64 GCC and add its `bin` directory to PATH.
3. Double-click `run_windows.bat`.
4. Wait for Flask to start, then open **http://127.0.0.1:5000** in Chrome.
5. Keep the terminal window open while using the website. Close it with Ctrl+C when finished.

## Run manually
From the project root:
```bash
python -m pip install -r requirements.txt
python backend/app.py
```
Open http://127.0.0.1:5000.

## How to use
1. The website loads a sample graph with six locations.
2. Add buildings and possible connections using the Network Builder.
3. Enter a non-negative integer construction cost for each connection.
4. Run Prim's or Kruskal's algorithm.
5. Inspect the highlighted MST, selected edges, total cost, execution time and algorithm steps.
6. Run the other algorithm on the same graph to compare results.
7. Use Reset sample to restore the example network.

## Input model
- Each building is a vertex.
- Each possible power-line connection is an undirected weighted edge.
- Costs are non-negative integers in user-defined units (for example, ₹ lakh). The sample weights are illustrative, not real construction estimates.
- The graph must be connected to have a spanning tree.
- Maximum: 100 vertices and 5,000 edges.

## Algorithms
### Prim
Uses an adjacency matrix and a greedy selection of the lowest-cost edge connecting the growing tree to an unvisited vertex. Time complexity: O(V²); space complexity: O(V²).

### Kruskal
Sorts edges by non-decreasing weight and uses Disjoint Set Union (Union-Find) with path compression and union by rank to reject cycle-forming edges. Time complexity: O(E log E); auxiliary space: O(V + E).

## Sample data and expected MST cost
Locations: A A Main Substation, B Academic Block, C Library, D Hostel Block, E Canteen, F Administration Block.

Edges: A-B 4, A-C 3, B-C 2, B-D 5, C-D 3, C-E 6, D-E 4, D-F 7, E-F 2.

One MST is: B-C (2), E-F (2), A-C (3), C-D (3), D-E (4). Total = **14**. Both algorithms should return minimum cost 14 for this sample (edge choices may differ for tied alternatives).

## Important implementation note
The C programs are the authoritative implementations of the algorithms. Flask compiles the relevant `.c` file with GCC and sends graph data through standard input. JavaScript only manages the interface and visualization; it does not implement the MST algorithms.

## Limitations / future scope
- The project uses a simplified graph model. Real electricity planning also requires capacity, voltage, reliability, geography, terrain, safety and regulatory constraints.
- Costs are illustrative input weights, not engineering estimates.
- Future extensions: geographic map coordinates, load/capacity constraints, outage resilience, exportable reports and persistent graph storage.

## Troubleshooting
- `gcc was not found`: install MinGW-w64 and add its `bin` folder to PATH; reopen VS Code.
- `python was not found`: install Python and enable Add Python to PATH.
- Flask import error: run `python -m pip install -r requirements.txt`.
- Website cannot connect: keep `python backend/app.py` running and open the exact local address shown.
- Browser shows a blank page: check the terminal for errors and reload the page.
