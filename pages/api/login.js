import * as auth from '~/auth.js';

export default async function handler(req, res) {
    if (req.method != "POST") {
        return res.status(400).json({
            success: false,
            message: "Bad request"
        });
    }

    let data = req.body;
    if (!data || !data.password) {
        return res.status(400).json({
            success: false,
            message: "Bad request"
        });
    }
    let password = data.password;
    let token = await auth.login(password);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Wrong password"
        });
    }
    return res.status(200).json({
        success: true,
        data: token
    });
}