import jwt from 'jsonwebtoken'

const geTokenSetCookie =  (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '10d'
    });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameState: "strict",
        secure: process.env.NODE_ENV !== 'development'
    });
}

export default geTokenSetCookie;