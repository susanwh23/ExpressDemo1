var express = require('express');
var router = express.Router();
var axios = require('axios');

const { ZOOM_API_BASE_URL } = require('../../constants');

// get Participants infornation

router.get('/', async (req, res) => {
    try {
        
        const { headerConfig, params } = req;
        const { meetingId } = params;

        const zoomMeetingParticipants = await axios.get(`${ZOOM_API_BASE_URL}/past_meetings/${meetingId}`, headerConfig);
        
        // 将 Zoom meeting 参会者信息传递给 EJS 模板
        res.render('participants', { user_name: zoomMeetingParticipants.data });
    } catch (error) {
        console.error('Error fetching Zoom meeting participants:', error);
        res.status(500).send('Error fetching Zoom meeting participants');
    }
});

module.exports = router;



