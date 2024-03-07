const express = require('express')
const PostModel = require('../Models/PostModel')
const {uploadpost} = require('../Utils/multer')
const cloudinary = require('../Utils/cloudinary')

const PostController = express.Router();

PostController.get('/', async (req,res) => {
    try {
        const posts = await PostModel.find();
        res.send(posts)
        
    } catch (error) {
        console.log(error)
    }
})

PostController.post('/', uploadpost.single('media'), async (req, res) => {
    const { description } = req.body;
    const mediaFile = req.file;

    if (!description ) {
        return res.send({ msg: 'Description and media are required' });
    }

    try {
        cloudinary.uploader.upload(mediaFile.path, async function(error, result) {
            if (error) {
                return res.send({ msg: 'Failed to upload media' });
            }

            const mediaUrl = result.secure_url;

            try {
                const post = await PostModel.create({
                    description: description,
                    media: mediaUrl,
                    likes: 0,
                    comments: []
                });
                console.log(post);
                res.send({ msg: 'Posted successfully' });
            } catch (createError) {
                console.error('Error creating post:', createError);
                res.send({ msg: 'Failed to create post' });
            }
        });
    } catch (error) {
        console.error('Error handling request:', error);
        res.send({ msg: 'Internal server error' });
    }
});


module.exports = PostController