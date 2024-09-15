// Kruskal's Algorithm in TypeScript
class Kruskal {
    private graph: {src: number, dest: number, weight: number}[];
    private vertices: number;

    constructor(vertices: number, edges: {src: number, dest: number, weight: number}[]) {
        this.graph = edges;
        this.vertices = vertices;
    }

    private find(parent: number[], i: number): number {
        if (parent[i] === i) return i;
        return this.find(parent, parent[i]);
    }

    private union(parent: number[], rank: number[], x: number, y: number): void {
        const xroot = this.find(parent, x);
        const yroot = this.find(parent, y);

        if (rank[xroot] < rank[yroot]) {
            parent[xroot] = yroot;
        } else if (rank[xroot] > rank[yroot]) {
            parent[yroot] = xroot;
        } else {
            parent[yroot] = xroot;
            rank[xroot]++;
        }
    }

    public kruskalMST(): void {
        const result: {src: number, dest: number, weight: number}[] = [];
        this.graph.sort((a, b) => a.weight - b.weight);

        const parent = [];
        const rank = [];

        for (let v = 0; v < this.vertices; v++) {
            parent[v] = v;
            rank[v] = 0;
        }

        let e = 0;
        let i = 0;
        while (e < this.vertices - 1) {
            const {src, dest, weight} = this.graph[i++];
            const x = this.find(parent, src);
            const y = this.find(parent, dest);

            if (x !== y) {
                result[e++] = {src, dest, weight};
                this.union(parent, rank, x, y);
            }
        }

        this.printMST(result);
    }

    private printMST(result: {src: number, dest: number, weight: number}[]): void {
        console.log("Edge \tWeight");
        result.forEach(({src, dest, weight}) => {
            console.log(`${src} - ${dest} \t${weight}`);
        });
    }
}

// Example usage
const edges = [
    {src: 0, dest: 1, weight: 10},
    {src: 0, dest: 2, weight: 6},
    {src: 0, dest: 3, weight: 5},
    {src: 1, dest: 3, weight: 15},
    {src: 2, dest: 3, weight: 4}
];

const kruskal = new Kruskal(4, edges);
kruskal.kruskalMST();
