import Note from "../model/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt: -1});//sort by createdAt in descending order
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error fetching notes",error);
        res.status(500).json({message: "Internal server error"});
    };
};

export async function getById(req,res){
    try{
        const note =await Note.findById(req.params.id);
        
        if (!note) {
            return res.status(404).json({message: "Note not found"});
        };
        res.status(200).json({message:"note found",note}); 
    }
    catch(error){
        console.error("Error fetching note",error);
        res.status(500).json({message: "Internal server error"});
    };
};

export async function createAllNotes(req,res){
    try{
        const {title,content}=req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(201).json({message: "Note created successfully",note: newNote});
    }
    catch(error){
        console.error("Error creating note",error);
        res.status(500).json({message: "Internal server error"});
    };
};

export async function updateAllNotes(req,res){
    try{
        const {title,content}=req.body;
        const newnote = new Note({title,content});
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content});
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        };
        res.status(200).json({message: "Note updated successfully",note: newnote});
    }
    catch(error){
        console.error("Error updating note",error);
        res.status(500).json({message: "Internal server error"});
    }
}; 

export async function deleteAllNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        };
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(error){
        console.error("Error deleting note",error);
        res.status(500).json({message: "Internal server error"});
    }
};