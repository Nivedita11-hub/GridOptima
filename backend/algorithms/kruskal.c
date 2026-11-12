#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAXV 100
#define MAXE 5000

typedef struct { int u, v, w; } Edge;
int parent[MAXV], rankSet[MAXV];

int findSet(int x) {
    if (parent[x] != x) parent[x] = findSet(parent[x]);
    return parent[x];
}
int unionSet(int a, int b) {
    a = findSet(a); b = findSet(b);
    if (a == b) return 0;
    if (rankSet[a] < rankSet[b]) { int t = a; a = b; b = t; }
    parent[b] = a;
    if (rankSet[a] == rankSet[b]) rankSet[a]++;
    return 1;
}
int compareEdges(const void *a, const void *b) {
    const Edge *x = (const Edge *)a, *y = (const Edge *)b;
    if (x->w != y->w) return x->w - y->w;
    if (x->u != y->u) return x->u - y->u;
    return x->v - y->v;
}

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2 || n < 1 || n > MAXV || m < 0 || m > MAXE) {
        printf("{\"ok\":false,\"error\":\"Invalid graph input.\"}\n");
        return 0;
    }
    Edge edges[MAXE];
    for (int i = 0; i < m; i++) {
        if (scanf("%d %d %d", &edges[i].u, &edges[i].v, &edges[i].w) != 3) {
            printf("{\"ok\":false,\"error\":\"Incomplete edge input.\"}\n");
            return 0;
        }
        if (edges[i].u < 0 || edges[i].u >= n || edges[i].v < 0 ||
            edges[i].v >= n || edges[i].u == edges[i].v || edges[i].w < 0) {
            printf("{\"ok\":false,\"error\":\"Invalid edge.\"}\n");
            return 0;
        }
    }

    clock_t start = clock();
    qsort(edges, m, sizeof(Edge), compareEdges);
    for (int i = 0; i < n; i++) { parent[i] = i; rankSet[i] = 0; }

    int chosenU[MAXV], chosenV[MAXV], chosenW[MAXV], chosen = 0;
    long long total = 0;
    for (int i = 0; i < m && chosen < n - 1; i++) {
        if (unionSet(edges[i].u, edges[i].v)) {
            chosenU[chosen] = edges[i].u;
            chosenV[chosen] = edges[i].v;
            chosenW[chosen] = edges[i].w;
            total += edges[i].w;
            chosen++;
        }
    }
    double elapsed = (double)(clock() - start) * 1000.0 / CLOCKS_PER_SEC;
    int connected = (chosen == n - 1);

    printf("{\"ok\":true,\"connected\":%s,\"total_cost\":%lld,\"visited\":%d,\"vertex_count\":%d,\"execution_ms\":%.6f,\"edges\":[",
           connected ? "true" : "false", total, connected ? n : chosen + 1, n, elapsed);
    for (int i = 0; i < chosen; i++) {
        if (i) printf(",");
        printf("{\"u\":%d,\"v\":%d,\"weight\":%d}", chosenU[i], chosenV[i], chosenW[i]);
    }
    printf("],\"steps\":[");
    for (int i = 0; i < chosen; i++) {
        if (i) printf(",");
        printf("\"Accept edge %d-%d with cost %d (does not form a cycle)\"", chosenU[i], chosenV[i], chosenW[i]);
    }
    printf("]}\n");
    return 0;
}
