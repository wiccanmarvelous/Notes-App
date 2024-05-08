import Card from "../models/cards.models.js";

export const setCards = async (req, res) => {
    try {
        const { userId, title, note, color } = req.body;

        const newCard = await Card.create({
            userId,
            title,
            note,
            color
        })
        await newCard.save();
        res.status(200).json(newCard);
    } catch (error) {
        console.log("Error in setCards controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCards = async (req, res) => {
    try {
        const { userId } = req.body;
        const cards = await Card.find({ userId: userId });
        if (!cards)
            return res.status(200).json([]);
        res.status(200).json(cards);

    } catch (error) {
        console.log("Error in getCards controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const editCard = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const result = await Card.findByIdAndUpdate(id, data, {new: true});
        if (!result)
            return res.status(404).json({ message: "Can't update note." });
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in editCard controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const delCard = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Card.findByIdAndDelete(id);
        if (!result)
            return res.status(404).json({ message: 'Note not found.' });
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in delCard controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}