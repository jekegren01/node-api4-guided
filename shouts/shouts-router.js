const express = require("express")
const { orWhereNotExists } = require("../data/config")
const shoutsModel = require("./shouts-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
// await makes the waits until the promise resolves
	try {
		const data = await shoutsModel.find()
		res.status(200).json(data)
	} catch(err) {
		// this code gets called if any errors occur in the above try statement
		next(err)
	}

	// shoutsModel.find()
	// 	.then((data) => res.status(200).json(data))
	// 	.catch((err) => next(err))
})

router.get("/:id", validateShoutId(), (req, res, next) => {
	res.status(200).json(req.shout)
})

router.post("/", async (req, res, next) => {
	try {
		const data = await shoutsModel.add(req.body)
		res.status(201).json(data)
	} catch(err) {
		next(err)
	}
	// shoutsModel.add(req.body)
	// 	.then((data) => res.status(201).json(data))
	// 	.catch((err) => next(err))
})

router.delete("/:id", validateShoutId(), async (req, res, next) => {
	try {
		await Shouts.remove(req.params.id)
		res.status(204).end()
	} catch (err) {
		next(err)
	}
	// Shouts.remove(req.params.id)
	// 	.then(() => res.status(204).end())
	// 	.catch((err) => next(err))
})

function validateShoutId() {
	return async (req, res, next) => {
		try {
			const shout = await shoutsModel.findById(req.params.id)

			if (shout) {
				req.shout = shout
				next()
			} else {
				res.status(404).json({
					message: "There was an error"
				})
			} 
		} catch(err) {
				next(err)
		}
		


		// shoutsModel.findById(req.params.id)
		// 	.then((shout) => {
		// 		if (shout) {
		// 			req.shout = shout
		// 			next()
		// 		} else {
		// 			res.status(404).json({
		// 				message: "Could not find shout",
		// 			})
		// 		}
		// 	})
		// 	.catch(next)
	}
}

module.exports = router
