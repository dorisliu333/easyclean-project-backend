const Offer = require('../../../models/offer');
const Task = require('../../../models/task');
const { errorHandler } = require('../../../middleware/errorHandler');

async function getAllOffers(req, res) {
  const offers = await Offer.find().exec();
  return res.json(offers);
}

async function getOfferById(req, res) {
  const { id } = req.params;
  const offer = await Offer.findById(id)
    .populate({
      path: 'taskerId',
      select: 'name user',
    })
    .exec();

  if (!offer) {
    return res.sendStatus(404);
  }
  return res.json(offer);
}

async function updateOfferById(req, res) {
  const errors = errorHandler(req, res);
  console.log(req.params);
  console.log(req.body);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }

  const { id } = req.params;
  const offer = await Offer.findById(id).exec();

  if (!offer) {
    return res.sendStatus(404);
  }

  const { task, user, priceOffer, assigned, priceAssigned, offerComment } = req.body;
 
  // only update fields those passed in
  if (task !== undefined) {
    offer.task = task;
  }
  if (user !== undefined) {
    offer.user = user;
  }
  if (priceOffer !== undefined) {
    offer.priceOffer = priceOffer;
  }
  if (assigned !== undefined) {
    offer.assigned = assigned;
  }
  if (priceAssigned !== undefined) {
    offer.priceAssigned = priceAssigned;
  }
  if (offerComment !== undefined) {
    offer.offerComment = offerComment;
  }

  await offer.save();
  return res.status(201).json(offer);
}

async function deleteOfferById(req, res) {
  const { id } = req.params;
  const offer = await Offer.findByIdAndDelete(id).exec();

  if (!offer) {
    return res.sendStatus(404);
  }

  // todo: delete references

  // 204 no content
  return res.sendStatus(204);
}

async function createOffer(req, res) {
  const errors = errorHandler(req, res);
  if (errors.length > 0) {
    return res.status(422).json({errors: errors});
  }

  const { task, user, priceOffer, assigned, priceAssigned, offerComment } = req.body;

  const offer = new Offer({ task, user, priceOffer, assigned, priceAssigned, offerComment });

  try {
    await offer.save();
  } catch (e) {
    console.log(`res.send(${e})`);
    return res.status(400).json(e);
  }
  // todo: add references
  const selectedTask = await Task.updateOne(
    {
      _id: task,
    },
    {
      $addToSet: {
        offers: [offer._id],
      },
    },
  );
  return res.status(201).json(offer);
}



module.exports = {
  getAllOffers,
  getOfferById,
  updateOfferById,
  deleteOfferById,
  createOffer,
};
