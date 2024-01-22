
const Package = require("../models/package");
const asyncHandler = require("express-async-handler");

export const package_list = asyncHandler(async (req: any, res: any, next: any) => {
    res.status(400).send("NOT IMPLEMENTED: Package list" + Package);
  });

