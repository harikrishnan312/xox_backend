
const test = (req, res) => {
    res.send("Hello World.....")
}

const createGame = (req, res) => {
    try {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;

        for (let i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        res.send({ board_id: result });

    } catch (error) {
        console.log(error)
        res.send({ board_id: "somethinhg went wrong try again" })
    }
}

const lastGame = (req, res) => {
    try {
        let lastGame = req.lastGame;

        if (lastGame.length === 0) {
            res.send('')
        }
        res.send(lastGame);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    test,
    createGame,
    lastGame
};