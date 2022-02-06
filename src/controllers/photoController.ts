// import { Request, Response } from "express";
// import { createConnection, getConnection, getRepository } from "typeorm";
// import { Photo } from "../entity/photo";
// import { UploadedFile } from "express-fileupload";
// import fs from "fs";

// export class PhotoController {
//   async list(req: Request, res: Response) {
//     const photolist = await Photo.find();
//     res.json(photolist);
//   }
//   // async upload(req: Request, res: Response) {
//   //   const connection = await getConnection();
//   //   let photo = new Photo();
//   //   photo.id;
//   //   photo.name = "";
//   //   photo.description = "";
//   //   photo.title = "";
//   //   photo.image = "";

//   //   await connection.manager.save(Photo);
//   //   console.log("Photo has been saved");
//   //   res.send("photoUploaded");
//   // }
//   async uploadPhotoPOST(req: Request, res: Response) {
//     const uploadDir = "public/uploads";
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     let uploadImage = req.files?.image as unknown as UploadedFile;
//     if (!uploadImage) {
//       return res.send("image is not found");
//     }
//     let uploadPath = __dirname + "/public/uploads/" + uploadImage.name;
//     uploadImage.mv(uploadPath, async () => {
//       await Photo.create({
//         ...req.body,
//         image: "/uploads/" + uploadImage.name,
//       });
//       res.redirect("/publicdiary");
//     });
//   }
//   async photoID(req: Request, res: Response) {
//     const photo = await Photo.findOne({
//       id: Number(req.params.id),
//     });
//     res.render("publicdiary", {
//       photo,
//     });
//   }
// }

// // import { Request, Response } from "express";
// // import express from "express";
// // import { Photo } from "../entity/photo";

// //---------Init Express App--------
// // const app = express();

// // //   res.render("publicdiary", {
// // //     photo,
// // //   });
// // // });
