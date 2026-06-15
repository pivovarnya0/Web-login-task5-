const http = require("http");
const url = require("url");

function gcd(a, b) {
    while (b != 0) {
        let c = b;
        b = a % b;
        a = c;
    }
    return a;
}

function lcm(a, b ) {
    return (a * b / gcd(a, b));
}

const server = http.createServer((req, res) => {
    let params = url.parse(req.url, true).query;

    let x = Number(params.x);
    let y = Number(params.y);

    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        res.end("NaN");
    }
    else {
        res.end(String(lcm(x, y)));
    }

});

server.listen(process.env.PORT || 3000);