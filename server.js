const http = require('http');
const url = require('url');

function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

const server = http.createServer((req, res) => {
    
    const parsed = url.parse(req.url, true);

    const x = Number(parsed.query.x);
    const y = Number(parsed.query.y);

    if (!x || !y || isNaN(x) || isNaN(y)) {
        res.end("NaN");
        return;
    }

    const result = lcm(x, y);
    res.end(String(result));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("servak rabotaet");
});