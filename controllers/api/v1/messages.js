// require the Message model
const Message = require("../../../models/Message");

const index = async (req, res) => {
    let messages = await Message.find({});
    res.json({
        status: "success",
        message: "GET all messages",
        data: [
            {
                messages: messages,
            },
        ],
    });
};

const create = async (req, res) => {
    let message = req.body.message.text;
    let user = req.body.message.user;
    let m = new Message();
    m.message = message;
    m.user = user;
    await m.save();

    res.json({
        status: "success",
        message: "POST a new message",
        data: [
            {
                message: m,
            },
        ],
    });
};

// making a put request
const update = async (req, res) => {
    try {
        let id = req.params.id;
        let message = await Message.find({ _id: id });

        if (!message) {
            return res.status(404).json({
                status: "error",
                message: "Message not found"
            });
        }

        res.json({
            status: "success",
            message: "PUT completed"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

// making an delete request
const destroy = async (req, res) => {
    let id = req.params.id;
    let m = await Message.findOneAndDelete({
        _id: id,
    });

    res.json({
        status: "success",
        message: "DELETE a message",
        data: [
            {
                message: m,
            },
        ],
    });
};


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;
