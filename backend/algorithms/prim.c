#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAXV 100
#define INF 1000000000

typedef struct { int u, v, w; } Edge;

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2 || n < 1 || n > MAXV || m < 0) {
        printf("{\"ok\":false,\"error\":\"Invalid graph input.\"}\n");
        return 0;
    }

    Edge edges[5000];
    int cost[MAXV][MAXV];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cost[i][j] = (i == j) ? 0 : INF;

    for (int i = 0; i < m; i++) {
        if (scanf("%d %d %d", &edges[i].u, &edges[i].v, &edges[i].w) != 3) {
            printf("{\"ok\":false,\"error\":\"Incomplete edge input.\"}\n");
            return 0;
        }
        int u = edges[i].u, v = edges[i].v, w = edges[i].w;
        if (u < 0 || u >= n || v < 0 || v >= n || u == v || w < 0) {
            printf("{\"ok\":false,\"error\":\"Invalid edge.\"}\n");
            return 0;
        }
        if (w < cost[u][v]) cost[u][v] = cost[v][u] = w;
    }

    clock_t start = clock();
    int key[MAXV], parent[MAXV], used[MAXV] = {0};
    for (int i = 0; i < n; i++) { key[i] = INF; parent[i] = -1; }
    key[0] = 0;

    int chosenU[MAXV], chosenV[MAXV], chosenW[MAXV], chosen = 0;
    long long total = 0;
    int visited = 0;

    for (int count = 0; count < n; count++) {
        int u = -1, best = INF;
        for (int v = 0; v < n; v++)
            if (!used[v] && key[v] < best) { best = key[v]; u = v; }

        if (u == -1) break;
        used[u] = 1;
        visited++;

        if (parent[u] != -1) {
            chosenU[chosen] = parent[u];
            chosenV[chosen] = u;
            chosenW[chosen] = key[u];
            total += key[u];
            chosen++;
        }

        for (int v = 0; v < n; v++) {
            if (!used[v] && cost[u][v] < key[v]) {
                key[v] = cost[u][v];
                parent[v] = u;
            }
        }
    }
    double elapsed = (double)(clock() - start) * 1000.0 / CLOCKS_PER_SEC;
    int connected = (visited == n);

    printf("{\"ok\":true,\"connected\":%s,\"total_cost\":%lld,\"visited\":%d,\"vertex_count\":%d,\"execution_ms\":%.6f,\"edges\":[",
           connected ? "true" : "false", total, visited, n, elapsed);
    for (int i = 0; i < chosen; i++) {
        if (i) printf(",");
        printf("{\"u\":%d,\"v\":%d,\"weight\":%d}", chosenU[i], chosenV[i], chosenW[i]);
    }
    printf("],\"steps\":[");
    for (int i = 0; i < chosen; i++) {
        if (i) printf(",");
        printf("\"Select edge %d-%d with cost %d\"", chosenU[i], chosenV[i], chosenW[i]);
    }
    printf("]}\n");
    return 0;
}
