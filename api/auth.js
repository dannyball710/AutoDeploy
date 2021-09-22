export async function checkToken(token) {
    let res = await fetch("./api/token", {
        method: "POST",
        body: JSON.stringify({
            token: t
        }),
        headers: {
            "Content-type": "application/json"
        }
    });
    let body = await res.json();
    return body.success;
}