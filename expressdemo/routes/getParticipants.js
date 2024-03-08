var express = require('express');
var router = express.Router();
var axios = require('axios');
var jwt = require('jsonwebtoken');


// 定义Zoom API的基本URL和认证信息
const baseUrl = 'https://api.zoom.us/v2';
//const zoomToken = 'YOUR_ZOOM_API_TOKEN';MZr0OfgITFOzVrlf_30lQg
const zoomApiKey = 'OsnJQFhURo2zOH3ettr1EA';
const zoomApiSecret = 'ecRkinAbmE4ZZrwySsx6DzyiO4WBVTya';

const payload = {
  iss: zoomApiKey,
  exp: ((new Date()).getTime() + 5000)
};

const zoomToken = jwt.sign(payload, zoomApiSecret);

console.log(zoomToken);

// get Participants infornation

router.get('/', async (req, res) => {
    try {
        const { meetingId, password } = req.query;

        const zoomMeetingParticipants = await axios.get(`${baseUrl}/past_meetings/${meetingId}`, {
           headers: {
              Authorization: `Bearer ${zoomToken}`
            }
        });

        // 将 Zoom meeting 参会者信息传递给 EJS 模板
        res.render('participants', { user_name: zoomMeetingParticipants.data });
    } catch (error) {
        console.error('Error fetching Zoom meeting participants:', error);
        res.status(500).send('Error fetching Zoom meeting participants');
    }
});

module.exports = router;



