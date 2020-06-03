var CubeController = (function() {
    
    var piecesXyz = {
        pos: {
            x: [],
            y: [],
            z: []
        },
        rot: {
            x: [],
            y: [],
            z: []
        },
        scl: {
            x: [],
            y: [],
            z: []
        }
    }
    
    return{
        init: function(){
//            piecesXyz.pos.x = [0, 100,200,0,  100,200,0,  100,200,0,  100,200,0,  100,200,0,  100,200,0,  100,200,0,  100,200,0,  100,200]
//            piecesXyz.pos.y = [0, 0,  0,  100,100,100,200,200,200,0,  0,  0,  100,100,100,200,200,200,0,  0,  0,  100,100,100,200,200,200]
//            piecesXyz.pos.z = [0, 0,  0,  0,  0,  0,  0,  0,  0,  100,100,100,100,100,100,100,100,100,200,200,200,200,200,200,200,200,200]
            piecesXyz.pos.x = [-100, 0,100,-100,0,100,-100,0,100,-100,0,100,-100,0,100,-100,0,100,-100,0,100,-100,0,100,-100,0,100]
            piecesXyz.pos.y = [-100,-100,-100,0,0,0,100,100,100,-100,-100,-100,0,0,0,100,100,100,-100,-100,-100,0,0,0,100,100,100]
            piecesXyz.pos.z = [-100,-100,-100,-100,-100,-100,-100,-100,-100,0,0,0,0,0,0,0,0,0,100,100,100,100,100,100,100,100,100]
            piecesXyz.rot.x = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            piecesXyz.rot.y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            piecesXyz.rot.z = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            piecesXyz.scl.x = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            piecesXyz.scl.y = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            piecesXyz.scl.z = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            return piecesXyz;
        }
    }
})();

var UIController = (function() {
    var DOMstrings = {
        cubeClass: '.cube',
        stickerClass: '.sticker',
        faceClass: '.face'
    };
    
    var cubeRotationType = 2
    
    var UIparams = {
        faces: {
            top: {
                color: 'green',
                pieces: [0,1,2,9,10,11,18,19,20]
            },
            bottom: {
                color: 'blue',
                pieces: [6,7,8,15,16,17,24,25,26]
            },
            right: {
                color: 'red',
                pieces: [2,5,8,11,14,17,20,23,26]
            },
            left: {
                color: 'orange',
                pieces: [0,3,6,9,12,15,18,21,24]
            },
            front: {
                color: 'white',
                pieces: [18,19,20,21,22,23,24,25,26]
            },
            back: {
                color: 'yellow',
                pieces: [0,1,2,3,4,5,6,7,8] //right
            }
        }
    }
    
    var cubeRotation = [1,0,1,90]
    
    var generateCSS = function() {
        console.log('generating CSS')
        
        var styleCube = document.createElement('style');
        styleCube.innerHTML = `.cube{
    display: flex;
    align-items: center;
    justify-content: center;

    perspective: none;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
}`
        //    transition: all .3s ease-in;
        var stylePiece = document.createElement('style');
        stylePiece.innerHTML = `.piece{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    /*transition: all .3s ease-in; /* not sure if will help */
}`
        var stylePlastic = document.createElement('style');
        stylePlastic.innerHTML = `.plastic{
    position: absolute;
    background-color: black;
    width: 100px;
    height: 100px;
}`
        
        var styleSticker = document.createElement('style');
        styleSticker.innerHTML = `.sticker{
    border-style: solid;
    border-color: black;
    border-width: 5px;
    border-radius: 25px;
    position: absolute; 
    width: 90px;
    height: 90px;
}`
        var styleFront = document.createElement('style');
        styleFront.innerHTML = `.front{
    transform: translateZ(50px);
}`
        var styleBack = document.createElement('style');
        styleBack.innerHTML = `.back{
    transform: rotateY(180deg) translateZ(50px);
}`
        var styleRight = document.createElement('style');
        styleRight.innerHTML = `.right{
    transform: rotateY(90deg) translateZ(50px);
}`
        var styleLeft = document.createElement('style');
        styleLeft.innerHTML = `.left{
    transform: rotateY(-90deg) translateZ(50px);
}`
        var styleTop = document.createElement('style');
        styleTop.innerHTML = `.top{
    transform: rotateX(90deg) translateZ(50px);
}`
        var styleBottom = document.createElement('style');
        styleBottom.innerHTML = `.bottom{
    transform: rotateX(-90deg) translateZ(50px);
}`
        
        document.head.appendChild(styleCube);
        document.head.appendChild(stylePiece);
        document.head.appendChild(stylePlastic);
        document.head.appendChild(styleSticker);
        document.head.appendChild(styleTop);
        document.head.appendChild(styleBottom);
        document.head.appendChild(styleLeft);
        document.head.appendChild(styleRight);
        document.head.appendChild(styleFront);
        document.head.appendChild(styleBack);
        
    }
    
    var getXyzFromTransform = function(transform){
        arr = transform.replace(/\s/g, '').split(',')
        if (arr.length==6){
            return {x:parseFloat(arr[4]),y:parseFloat(arr[5]),z:0}
        }
        return {x:parseFloat(arr[12]),y:parseFloat(arr[13]),z:parseFloat(arr[14])}
    }
    var getRotFromTransform = function(transform){
        arr = transform.replace(/\s/g, '').split(',')
        if (arr.length==6){
            return [[parseFloat(arr[0].slice(7)),parseFloat(arr[1]),0],[parseFloat(arr[2]),parseFloat(arr[3]),0],[0,0,0]]
        }
        return [[parseFloat(arr[0].slice(9)),parseFloat(arr[1]),parseFloat(arr[2])],[parseFloat(arr[4]),parseFloat(arr[5]),parseFloat(arr[6])],[parseFloat(arr[8]),parseFloat(arr[9]),parseFloat(arr[10])]]
    }
    
    var crossProduct = function(v1,v2){
        return [v1[1]*v2[2]-v1[2]*v2[1],v1[2]*v2[0]-v1[0]*v2[2],v1[0]*v2[1]-v1[1]*v2[0]]
    }
    
    
    var getRotation = function(sticker_el,grad_x,grad_y){
        piece_id = sticker_el.parentElement.parentElement.id
        piece_style = window.getComputedStyle(event.target.parentElement.parentElement).transform
        plastic_style = window.getComputedStyle(event.target.parentElement).transform

        piece_xyz = getXyzFromTransform(piece_style)
        piece_rot = getRotFromTransform(piece_style)
        plastic_xyz = getXyzFromTransform(plastic_style)
        plastic_xyz_after_rot = {
            x: piece_rot[0][0]*plastic_xyz.x+piece_rot[1][0]*plastic_xyz.y+piece_rot[2][0]*plastic_xyz.z,
            y: piece_rot[0][1]*plastic_xyz.x+piece_rot[1][1]*plastic_xyz.y+piece_rot[2][1]*plastic_xyz.z,
            z: piece_rot[0][2]*plastic_xyz.x+piece_rot[1][2]*plastic_xyz.y+piece_rot[2][2]*plastic_xyz.z
        }
        
        console.log(piece_xyz,plastic_xyz_after_rot)
        
        sumx = piece_xyz.x+plastic_xyz_after_rot.x
        sumy = piece_xyz.y+plastic_xyz_after_rot.y
        sumz = piece_xyz.z+plastic_xyz_after_rot.z
        
        stickerDir = [0,0,0]
        if (sumx == 150){
            stickerDir[0] = 1
        }
        if (sumy == 150){
            stickerDir[1] = 1
        }
        if (sumz == 150){
            stickerDir[2] = 1
        }
        if (sumx == -150){
            stickerDir[0] = -1
        }
        if (sumy == -150){
            stickerDir[1] = -1
        }
        if (sumz == -150){
            stickerDir[2] = -1
        }
        

//        rotatedDir = [(cubeRotation[0][0]+cubeRotation[0][1]+cubeRotation[0][2])*grad_x,
//                      (cubeRotation[1][0]+cubeRotation[1][1]+cubeRotation[1][2])*grad_y]
        gradDir = [cubeRotation[0][0]*grad_x+cubeRotation[0][1]*grad_y,
                   cubeRotation[1][0]*grad_x+cubeRotation[1][1]*grad_y,
                   cubeRotation[2][0]*grad_x+cubeRotation[2][1]*grad_y]
        
        
        projectionDir = crossProduct(stickerDir,crossProduct(gradDir,stickerDir))
        rotationDir = crossProduct(stickerDir,projectionDir)
        maxAbs = Math.max.apply(null, rotationDir.map(Math.abs))
//        
//        console.log(stickerDir, sumx,sumy,sumz)
//        console.log(projectionDir)
//        console.log(rotationDir)
//        console.log(piece_xyz)
        if (Math.abs(rotationDir[0]) == maxAbs ){
            if (rotationDir[0] == maxAbs){
                return [{x:1,y:0,z:0},piece_xyz.x]
            } else {
                return [{x:-1,y:0,z:0},-piece_xyz.x]
            }    
        }
        if (Math.abs(rotationDir[1]) == maxAbs ){
            if (rotationDir[1] == maxAbs){
                return [{x:0,y:1,z:0},piece_xyz.y]
            } else {
                return [{x:0,y:-1,z:0},-piece_xyz.y]
            }    
        }
        if (Math.abs(rotationDir[2]) == maxAbs ){
            if (rotationDir[2] == maxAbs){
                return [{x:0,y:0,z:1},piece_xyz.z]
            } else {
                return [{x:0,y:0,z:-1},-piece_xyz.z]   
            }    
        }
    }
    
    var rotatePieces = function(rotationDir, distance, angle){
        console.log(rotationDir, distance, angle)
        for (id = 0; id < 27; id++) { //loop over pieces
            piece_el = document.getElementById('piece-'+id)
            pieceTransform = window.getComputedStyle(piece_el).transform
            pieceXyz = getXyzFromTransform(pieceTransform)
            projection = pieceXyz.x*rotationDir.x+pieceXyz.y*rotationDir.y+pieceXyz.z*rotationDir.z
            
//            console.log(pieceXyz , rotationDir)
//            console.log(projection , distance)
            if (projection > distance - 0.1 && projection < distance + 0.1)
            {
                piece_el.style.transform = 'rotate3d('+rotationDir.x+','+rotationDir.y+','+rotationDir.z+','+angle+'deg)' + pieceTransform
            }
//                
//                pieceTransformMat = pieceTransform.replace(/\s/g, '').split(',')
//                if (pieceTransformMat.length==6){
//                    pieceTransformMat[0] = pieceTransformMat[0].slice(7)
//                    pieceTransformMat[5] = pieceTransformMat[5].replace(')','')
//                }
//                if (pieceTransformMat.length==16){
//                    pieceTransformMat[0] = pieceTransformMat[0].slice(9)
//                    pieceTransformMat[15] = pieceTransformMat[15].replace(')','')
//                }
//                z = 


//            piece_el.style.transform = 'rotate3d('+rotation[0]+','+rotation[1]+','+rotation[2]+','+rotation[3]+'deg)' + pieceTransform
        }

    }
    
    return{
        setupCube: function(piecesXyz){
            generateCSS()
            cubeElement = '<div class="cube" style="transform: rotate3d(1, 1, 0, 45deg)"> </div>' 
            document.body.innerHTML += cubeElement;
            
            piece = `<div class="piece" id="piece-%id%" style="transform: translate3d( %posx%px, %posy%px, %posz%px) rotate3d(0, 0, 0, 0deg);">
            <div class="plastic front"> </div>
            <div class="plastic back"> </div>
            <div class="plastic right"> </div>
            <div class="plastic left"> </div>
            <div class="plastic top"> </div>
            <div class="plastic bottom"> </div>
        </div>`
            sticker = `<div class="sticker" style="background-color: %color%;"> </div> </div>`
            
            for (id = 0; id < piecesXyz.pos.x.length; id++) {
                newPiece = piece.replace('%id%', id)
                newPiece = newPiece.replace('%posx%', piecesXyz.pos.x[id])
                newPiece = newPiece.replace('%posy%', piecesXyz.pos.y[id])
                newPiece = newPiece.replace('%posz%', piecesXyz.pos.z[id])
                document.querySelector(".cube").insertAdjacentHTML('beforeend',newPiece);
            }
            
//            console.log('start coloring')
            colorskeys = Object.keys(UIparams.faces)
            for (i = 0; i < Object.keys(UIparams.faces).length; i++) {
                side = Object.keys(UIparams.faces)[i]
                face = UIparams.faces[side]
//                console.log('coloring '+side)
                
                for (j = 0; j < face.pieces.length; j++) {
                    id = face.pieces[j]
                    newSticker = sticker.replace('%color%', face.color)
//                    console.log('coloring '+face.color +' on '+id)
//                    console.log(document.getElementById("piece-"+id).getElementsByClassName(side))
                    document.getElementById("piece-"+id).querySelector('.'+side).insertAdjacentHTML('beforeend',newSticker);
                }
            }
            
            currentTransform = window.getComputedStyle(document.querySelector('.cube')).transform 
            cubeRotation = getRotFromTransform(currentTransform)
        },
        
        rotateCube: function(curr_pos, prev_pos){
            currentTransform = window.getComputedStyle(document.querySelector('.cube')).transform 
            cubeRotation = getRotFromTransform(currentTransform)
//            console.log(cubeRotation)
            if (cubeRotationType == 1){
                grad_x = curr_pos.x - prev_pos.x 
                grad_y = curr_pos.y - prev_pos.y
                document.querySelector('.cube').style.transform = 'rotate3d('+(-grad_y)+', 0, '+grad_x+', '+Math.sqrt(grad_x*grad_x+grad_y*grad_y)+'deg)' + currentTransform; 
            }
            if (cubeRotationType == 2){
                cube_origin = {x:parseFloat(window.getComputedStyle(document.querySelector('.cube')).width)/2,
                               y:parseFloat(window.getComputedStyle(document.querySelector('.cube')).height)/2}
                prev_pos.x = prev_pos.x - cube_origin.x
                prev_pos.y = prev_pos.y - cube_origin.y
                curr_pos.x = curr_pos.x - cube_origin.x
                curr_pos.y = curr_pos.y - cube_origin.y
                curr_pos_r = Math.sqrt(curr_pos.x*curr_pos.x+curr_pos.y*curr_pos.y)
                prev_pos_r = Math.sqrt(prev_pos.x*prev_pos.x+prev_pos.y*prev_pos.y)
                grad_r = curr_pos_r - prev_pos_r
                grad_t = (Math.atan2(curr_pos.y,curr_pos.x) - Math.atan2(prev_pos.y,prev_pos.x))
                document.querySelector('.cube').style.transform = 'rotate3d('+(-(prev_pos.y) ) +', '+(prev_pos.x) +', 0, '+grad_r+'deg)' +'rotateZ('+grad_t+'rad)'+ currentTransform;
            }
        },
        
        
        rotateFace: function(stickerEl, currPos, prevPos){
            gradX = currPos.x - prevPos.x 
            gradY = currPos.y - prevPos.y
            rotation = getRotation(stickerEl,gradX,gradY)
            rotatePieces(rotation[0], rotation[1], 90)
            
            
            
        }
        
    }
    
})();
    
var controller = (function(CubeCtrl, UICtrl) {
    var mouse_pos = {
        tracking: '',
        sticker_el: '',
        x: 0,
        y: 0
    }
    
    
    
    var setupEventListeners = function(){
        document.addEventListener('mousedown touchstart', function(event) {
            element_first_class = event.target.className.split(' ')[0]
            if (element_first_class=='plastic'){
                return 0
            }
            if (element_first_class=='sticker'){
                mouse_pos.sticker_el = event.target
                mouse_pos.x = event.clientX
                mouse_pos.y = event.clientY
                mouse_pos.tracking = 'face'
            } else{
                mouse_pos.x = event.clientX
                mouse_pos.y = event.clientY
                mouse_pos.tracking = 'cube'   
            }
        });  
        document.addEventListener('mouseup', function(event) {
            mouse_pos.x = event.clientX
            mouse_pos.y = event.clientY
            mouse_pos.tracking = ''   
        });  
        document.addEventListener('mousemove', function(event) {
            if (mouse_pos.tracking == 'cube'){
                UICtrl.rotateCube({x:event.clientX, y:event.clientY}, {x:mouse_pos.x,y:mouse_pos.y})
                mouse_pos.x = event.clientX
                mouse_pos.y = event.clientY
            }
            if (mouse_pos.tracking == 'face'){
                UICtrl.rotateFace(mouse_pos.sticker_el, {x:event.clientX, y:event.clientY}, {x:mouse_pos.x,y:mouse_pos.y})
                mouse_pos.x = event.clientX
                mouse_pos.y = event.clientY
                mouse_pos.tracking = ''
            }
        });  
        
    }
    
    return {
        init: function(){
            console.log('starting application')
            piecesXyz = CubeCtrl.init()
            UICtrl.setupCube(piecesXyz)
            setupEventListeners()
        }
    }
})(CubeController, UIController);

controller.init()
