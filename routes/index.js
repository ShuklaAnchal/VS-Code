var express = require('express');
var router = express.Router();
var fs= require("fs");

router.get('/', function(req, res){
  var filedp =[];
  fs.readdir("./uplods", {withFileTypes:true},function(err, files){
    files.forEach(function(file){
      filedp.push({name:file.name, isFolder:file.isDirectory()});
    });
    res.render("index", {files:filedp});
  });
});

router.get('/createfile', function(req, res){
    fs.writeFile(`./uplods/${req.query.filename}`, "", function(err){
      if(err){
        console.log("file not created");
      }
      else{
        res.redirect("/");
      }
    });
  });
  router.get('/createfolder', function(req, res){
    fs.mkdir(`./uplods/${req.query.foldername}`, function(err){
      if(err){
        console.log("folder not created");
      }
      else{
        res.redirect("/");
      }
    });
  });

  // router.get("/username/:chach")
  // res.send("filename")
router.get("/file/:openFile", function(req, res){
  var filedp =[];
  fs.readdir("./uplods", {withFileTypes:true},function(err, files){
    files.forEach(function(file){
      filedp.push({name:file.name, isFolder:file.isDirectory()});
    });
    fs.readFile(`/uplods/${req.params.openFile}`, "utf8", function(err, data){
      res.render("fileopened", {files:filedp, filename:req.params.openFile, data});  
    })
    // res.render("fileopened", {files:filedp});
  });
     // res.send(req.params.openFile);
})

router.get("/fileDeleted/:fileName", function(req, res){
  fs.unlink(`./uplods/${req.params.fileName}`, function(err){
    if(err){
      console.log("not deleted")
    }
    else{
      res.redirect("/");
    }
  });
});

router.get('/folderDeleted/:folderName', function(req, res){
  fs.rmdir(`./uplods/${req.params.folderName}`, function(err){
    if(err){
      console.log("folder not created");
    }
    else{
      res.redirect("/");
    }
  });
});

router.post("/dataSaved/:fileName", function(req, res){
  fs.writeFile(`./uplods/${req.params.fileName}`, req.body.dataFile, function(err, data){
if(err){
  console.log(err);
} else{
  //  res.redirect(`/file/${req.params.fileName}`)
   console.log("updated");
   res.redirect("back")
}
  });
});

// router.get('/openfile/:filename', function(req, res){
//   res.sendFile(path.join(_dirname, `../uplods/${req.params.filename}`));
// });

// router.post("/dataSaved/:namefile", function(req, res){
//   fs.writeFile(`.uplods/${req.params.namefile}`, req.body.dataFile,'utf-8', function(err, data){
// if(err)throw err;
// res.redirect(req.headers.referer);
//   });
// });

module.exports = router;
