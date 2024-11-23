const models = require('../models/index');
const session = require('express-session');

exports.createRequest = async (req, res) => {
  try {
    const _service = await models.Service.findOne({
      where: { id: req.body.service_id },
    });
    if (!_service) {
      console.log('Service not found.');
      return res.status(400).json({
      });
    }
    let cost = 0;
    if (_service.providerType === '3') {
      //is a Fuel Supplier's job, then we need to calculate the cost as service table has cost per liter.
      const perLiter = +_service.cost;
      const quantity = +req.body.content;
      cost = quantity * perLiter;
    } else {
      cost = +_service.cost;
    }
    const reqDetails = {
      location: req.body.location,
      description: req.body.content,
      startTime: req.body.startTime,
      service_id: req.body.service_id,
      requesting_user_id: req.session.userDetails.userId,
      cost,
    };
    req.session.reqDetails = reqDetails;
    res.status(200).json({
      status: 'success',
    });
    console.log('Success');
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};



    exports.getRequestById = async (req, res) => {
      try {
          // Extract requestId from URL parameters
          const requestId = req.query.requestId
          console.log(requestId);
          if (!requestId) {
              return res.status(400).json({ error: 'requestId is required' });
          }
  
          // Query the database for the request by requestId
          const query = ` SELECT 
    u.name AS requestinguser,
    s.name AS name,
	r."startTime" AS "startTime",
    r.description AS description
FROM 
    "Request" r
JOIN 
    "User" u ON r.requesting_user_id = u.id
JOIN 
    "Service" s ON r.service_id = s.id
WHERE 
    r.id = :requestId;`; // Use named parameter
          const data = await models.sequelize.query(query, {
              replacements: { requestId }, // Use named parameter replacement
              type: models.Sequelize.QueryTypes.SELECT, // Use SELECT to fetch data
          });
  
          // Check if data is found
          if (data.length === 0) {
              return res.status(404).json({ error: 'Request not found' });
          }
  
          // Send the fetched data as a response
          res.json(data[0]); // Return the first result
      } catch (error) {
          console.error('Error fetching request by ID:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  };
  
  exports.updateOfferForRequest = async (req, res) => {
   try
   {

    console.log(req.body);  // demand, description, requestId, techId
    const _offer = await models.Offer.create({
      demand: req.body.demand,
      tech_id: req.body.techId,
      description: req.body.description,
      req_id: req.body.requestId,
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};