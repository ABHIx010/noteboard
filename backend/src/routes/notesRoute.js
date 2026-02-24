import express from 'express';
import { getAllNotes,createAllNotes,updateAllNotes,deleteAllNotes, getById } from "../controllers/notesController.js";

const router=express.Router();

router.get("/",getAllNotes);

router.get("/:id",getById);

router.post("/",createAllNotes);

router.put("/:id",updateAllNotes);

router.delete("/:id",deleteAllNotes);

export default router;