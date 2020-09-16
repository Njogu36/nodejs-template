const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
user_id:String,
title:String,
description:String,
status:String,
start_date:String,
due_date:String,
assigned_to:[],
created_on:String
});
const Task = mongoose.model('Task',taskSchema);
module.exports = Task;