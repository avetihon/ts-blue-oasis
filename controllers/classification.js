const trainModel = (request, response) => {
    console.log(request.body);
    response.status(200).json({ success: true });
};

module.exports = {
    trainModel
};
