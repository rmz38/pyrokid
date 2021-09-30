package pyrokid
{
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.KeyboardEvent;
   import flash.events.MouseEvent;
   import flash.geom.Point;
   import flash.ui.Keyboard;
   import flash.utils.Dictionary;
   import pyrokid.tools.Key;
   import ui.ButtonBackground;
   import ui.LevelEditorButton;
   import ui.LevelEditorInput;
   import ui.SelectorButton;
   
   public class LevelEditor extends Sprite
   {
       
      
      private var level:Level;
      
      public var reloadLevel:Function;
      
      private var editMode:int;
      
      private var numEditModes:int = 4;
      
      private var UI_Elements:Array;
      
      private var cellsWidthInput:LevelEditorInput;
      
      private var cellsHeightInput:LevelEditorInput;
      
      private var dragging:Boolean = false;
      
      private var holdStart:Vector2i;
      
      private var draggingRect:Sprite;
      
      private var allObjectTypesButton:SelectorButton;
      
      private var selectedCell:Vector2i;
      
      private var typeSelected = 0;
      
      private var objectEditor:Sprite;
      
      private var selectedHighlighter:Sprite;
      
      private var selectedButton:LevelEditorButton;
      
      private var noObjectSelectedSprite:Sprite;
      
      private var rectLowX:int;
      
      private var rectHighX:int;
      
      private var rectLowY:int;
      
      private var rectHighY:int;
      
      public function LevelEditor(param1:Level)
      {
         super();
         this.level = param1;
         this.editMode = 0;
         this.UI_Elements = [];
         this.draggingRect = new Sprite();
         this.draggingRect.graphics.lineStyle(0,16711935);
         this.draggingRect.graphics.beginFill(16777215,0.1);
         this.draggingRect.graphics.drawRect(0,0,Constants.CELL,Constants.CELL);
         this.draggingRect.graphics.endFill();
         this.UI_Elements.push(this.draggingRect);
         this.UI_Elements.push(new LevelEditorButton(this.toggleEditMode,120,25,650,50,["Editing Objects","Clumping Objects","Connector Mode","Object Properties"],[LevelEditorButton.upColor,16711680,65280,255]));
         this.cellsWidthInput = new LevelEditorInput("Map Width",param1.cellWidth,650,100,this.updateWidth);
         this.cellsHeightInput = new LevelEditorInput("Map Height",param1.cellHeight,650,150,this.updateHeight);
         this.UI_Elements.push(this.cellsWidthInput,this.cellsHeightInput);
         this.UI_Elements.push(new LevelEditorButton(this.newLevel,120,25,650,460,["New Level"],[LevelEditorButton.upColor,LevelEditorButton.overColor,LevelEditorButton.downColor]));
         var _loc2_:Dictionary = new Dictionary();
         _loc2_[Constants.EMPTY_TILE_CODE] = "Empty";
         _loc2_[Constants.WALL_TILE_CODE] = "Dirt Tile";
         _loc2_[Constants.OIL_TILE_CODE] = "Eternal Flame";
         _loc2_[Constants.WOOD_TILE_CODE] = "Quick Burn";
         _loc2_[Constants.METAL_TILE_CODE] = "Metal";
         _loc2_[Constants.SPIDER_CODE] = "Spider";
         _loc2_[Constants.SPIDER_ARMOR_CODE] = "Armored Spider";
         _loc2_[Constants.IMMUNE_CODE] = "Immune Enemy";
         _loc2_[Constants.BAT_CODE] = "Water Bat";
         _loc2_[Constants.BOMB_EXIT_CODE] = "Bomb Exit";
         _loc2_[Constants.HOLE_EXIT_CODE] = "Hole Exit";
         _loc2_["player"] = "Player";
         this.allObjectTypesButton = new SelectorButton(_loc2_,this.changeSelectedObject);
         this.allObjectTypesButton.x = 650;
         this.UI_Elements.push(this.allObjectTypesButton);
         this.objectEditor = new Sprite();
         this.selectedHighlighter = new Sprite();
         this.selectedHighlighter.graphics.lineStyle(2,65280);
         this.selectedHighlighter.graphics.drawRect(0,0,Constants.CELL,Constants.CELL);
         this.noObjectSelectedSprite = new ButtonBackground(16711680,120,25,"none selected");
         this.noObjectSelectedSprite.x = 0;
         this.noObjectSelectedSprite.y = 200;
         this.selectedButton = new LevelEditorButton(this.toggleGravity,120,25,650,200,["No Gravity","Gravity"],[LevelEditorButton.upColor,16711680]);
         this.objectEditor.addChild(this.noObjectSelectedSprite);
         this.objectEditor.addChild(this.selectedHighlighter);
         this.objectEditor.addChild(this.selectedButton);
         this.UI_Elements.push(this.objectEditor);
         this.renderVisibleObjects();
      }
      
      private static function normalizeIds(param1:Array) : void
      {
         var newLowId:int = 0;
         var oldIdsToNewIds:Dictionary = null;
         var grid:Array = param1;
         newLowId = 1;
         oldIdsToNewIds = new Dictionary();
         oldIdsToNewIds[0] = 0;
         Utils.foreach(grid,function(param1:int, param2:int, param3:int):void
         {
            if(oldIdsToNewIds[param3] == undefined)
            {
               oldIdsToNewIds[param3] = newLowId;
               newLowId += 1;
            }
            grid[param2][param1] = oldIdsToNewIds[param3];
         });
      }
      
      private static function getMaxId(param1:Array) : int
      {
         var maxId:int = 0;
         var array:Array = param1;
         maxId = 0;
         Utils.foreach(array,function(param1:int, param2:int, param3:int):void
         {
            maxId = Math.max(maxId,param3);
         });
         return maxId;
      }
      
      public function get levelScale() : Number
      {
         return this.level.scaleX;
      }
      
      public function set levelScale(param1:Number) : void
      {
         this.level.scaleX = param1;
         this.level.scaleY = param1;
      }
      
      private function renderVisibleObjects() : void
      {
         this.draggingRect.visible = this.editMode == Constants.EDITOR_PROPERTIES_MODE;
         this.allObjectTypesButton.visible = this.editMode == Constants.EDITOR_OBJECT_MODE;
         this.objectEditor.visible = false;
         var _loc1_:Boolean = this.editMode == Constants.EDITOR_PROPERTIES_MODE && this.selectedCell == null;
         this.noObjectSelectedSprite.visible = _loc1_;
         this.selectedHighlighter.visible = _loc1_;
         this.selectedButton.visible = _loc1_;
      }
      
      private function changeSelectedObject(param1:*) : void
      {
         this.typeSelected = param1;
      }
      
      private function toggleGravity() : void
      {
         var _loc1_:int = this.selectedCell.x;
         var _loc2_:int = this.selectedCell.y;
         this.level.recipe.walls[_loc2_][_loc1_] = -this.level.recipe.walls[_loc2_][_loc1_];
         this.level.reset(this.level.recipe);
      }
      
      private function toggleEditMode() : void
      {
         this.editMode = (this.editMode + 1) % this.numEditModes;
         this.selectedCell = null;
         this.renderVisibleObjects();
      }
      
      private function newLevel(param1:MouseEvent) : void
      {
         this.reloadLevel(LevelRecipe.generateTemplate());
      }
      
      private function updateHeight(param1:int) : void
      {
         var _loc6_:* = undefined;
         var _loc7_:Array = null;
         var _loc8_:Array = null;
         var _loc9_:Array = null;
         var _loc10_:Array = null;
         var _loc11_:* = undefined;
         if(param1 < 1)
         {
            return;
         }
         var _loc2_:Array = this.level.recipe.walls;
         var _loc3_:* = getMaxId(this.level.recipe.tileEntities) + 1;
         var _loc4_:int = _loc2_[0].length;
         var _loc5_:int = _loc2_.length;
         if(param1 >= _loc5_)
         {
            _loc6_ = _loc5_;
            while(_loc6_ < param1)
            {
               _loc7_ = [];
               _loc8_ = [];
               _loc9_ = [];
               _loc10_ = [];
               _loc11_ = 0;
               while(_loc11_ < _loc4_)
               {
                  _loc7_.push(1);
                  _loc8_.push(0);
                  _loc9_.push(_loc3_);
                  _loc10_.push(0);
                  _loc3_ += 1;
                  _loc11_++;
               }
               _loc2_.push(_loc7_);
               this.level.recipe.islands.push(_loc8_);
               this.level.recipe.tileEntities.push(_loc9_);
               this.level.recipe.edges.push(_loc10_);
               _loc6_++;
            }
         }
         else
         {
            _loc2_.splice(param1);
            this.level.recipe.islands.splice(param1);
            this.level.recipe.tileEntities.splice(param1);
            this.level.recipe.edges.splice(param1);
         }
         this.level.recipe.walls = _loc2_;
         this.level.reset(this.level.recipe);
      }
      
      private function updateWidth(param1:int) : void
      {
         var _loc6_:* = undefined;
         var _loc7_:* = undefined;
         if(param1 < 1)
         {
            return;
         }
         var _loc2_:Array = this.level.recipe.walls;
         var _loc3_:* = getMaxId(this.level.recipe.tileEntities) + 1;
         var _loc4_:int = _loc2_[0].length;
         var _loc5_:int = _loc2_.length;
         if(param1 >= _loc4_)
         {
            _loc6_ = 0;
            while(_loc6_ < _loc5_)
            {
               _loc7_ = _loc4_;
               while(_loc7_ < param1)
               {
                  _loc2_[_loc6_].push(1);
                  this.level.recipe.islands[_loc6_].push(0);
                  this.level.recipe.tileEntities[_loc6_].push(_loc3_);
                  this.level.recipe.edges[_loc6_].push(0);
                  _loc3_ += 1;
                  _loc7_++;
               }
               _loc6_++;
            }
         }
         else
         {
            _loc6_ = 0;
            while(_loc6_ < _loc5_)
            {
               _loc2_[_loc6_].splice(param1);
               this.level.recipe.islands[_loc6_].splice(param1);
               this.level.recipe.tileEntities[_loc6_].splice(param1);
               this.level.recipe.edges[_loc6_].splice(param1);
               _loc6_++;
            }
         }
         this.level.recipe.walls = _loc2_;
         this.level.reset(this.level.recipe);
      }
      
      public function turnEditorOn() : void
      {
         Main.MainStage.addEventListener(MouseEvent.MOUSE_DOWN,this.mouseDown);
         Main.MainStage.addEventListener(MouseEvent.MOUSE_MOVE,this.mouseMove);
         Main.MainStage.addEventListener(MouseEvent.MOUSE_UP,this.mouseUp);
         Main.MainStage.addEventListener(KeyboardEvent.KEY_DOWN,this.onKeyDown);
         Main.MainStage.addEventListener(Event.ENTER_FRAME,this.update);
         Main.MainStage.addEventListener(Event.RESIZE,this.resetButtons);
         var _loc1_:int = 0;
         while(_loc1_ < this.UI_Elements.length)
         {
            addChild(this.UI_Elements[_loc1_]);
            _loc1_++;
         }
      }
      
      public function turnEditorOff() : void
      {
         Main.MainStage.removeEventListener(MouseEvent.MOUSE_DOWN,this.mouseDown);
         Main.MainStage.removeEventListener(MouseEvent.MOUSE_MOVE,this.mouseMove);
         Main.MainStage.removeEventListener(MouseEvent.MOUSE_UP,this.mouseUp);
         Main.MainStage.removeEventListener(KeyboardEvent.KEY_DOWN,this.onKeyDown);
         Main.MainStage.removeEventListener(Event.ENTER_FRAME,this.update);
         Main.MainStage.removeEventListener(Event.RESIZE,this.resetButtons);
         this.level.x = 0;
         this.level.y = 0;
         this.levelScale = 1;
         Utils.removeAllChildren(this);
      }
      
      private function resetButtons(param1:Event = null) : void
      {
         var _loc2_:int = 140;
         this.selectedButton.x = stage.stageWidth - _loc2_;
         this.UI_Elements[1].x = stage.stageWidth - _loc2_;
         this.UI_Elements[2].x = stage.stageWidth - _loc2_;
         this.UI_Elements[3].x = stage.stageWidth - _loc2_;
         this.UI_Elements[4].x = stage.stageWidth - _loc2_;
         this.UI_Elements[5].x = stage.stageWidth - _loc2_;
      }
      
      public function loadLevel(param1:Level) : void
      {
         this.level = param1;
         this.renderVisibleObjects();
      }
      
      public function update(param1:Event = null) : void
      {
         if(this.editMode == 4)
         {
         }
      }
      
      private function mouseDown(param1:MouseEvent) : void
      {
         var _loc2_:Point = this.level.globalToLocal(new Point(param1.stageX,param1.stageY));
         var _loc3_:int = _loc2_.x / Constants.CELL;
         var _loc4_:int = _loc2_.y / Constants.CELL;
         if(_loc3_ < 0 || _loc4_ < 0)
         {
            return;
         }
         this.dragging = true;
         this.holdStart = new Vector2i(_loc3_,_loc4_);
         this.draggingRect.x = _loc3_ * Constants.CELL * this.levelScale + this.level.x;
         this.draggingRect.y = _loc4_ * Constants.CELL * this.levelScale + this.level.y;
         this.draggingRect.width = Constants.CELL * this.levelScale;
         this.draggingRect.height = Constants.CELL * this.levelScale;
         this.draggingRect.visible = true;
      }
      
      private function mouseMove(param1:MouseEvent) : void
      {
         var _loc2_:Point = null;
         var _loc3_:int = 0;
         var _loc4_:int = 0;
         var _loc5_:int = 0;
         var _loc6_:int = 0;
         if(this.dragging)
         {
            _loc2_ = this.level.globalToLocal(new Point(param1.stageX,param1.stageY));
            _loc3_ = _loc2_.x / Constants.CELL;
            _loc4_ = _loc2_.y / Constants.CELL;
            this.rectLowX = _loc3_ < this.holdStart.x ? int(_loc3_) : int(this.holdStart.x);
            this.rectHighX = _loc3_ < this.holdStart.x ? int(this.holdStart.x) : int(_loc3_);
            this.rectLowY = _loc4_ < this.holdStart.y ? int(_loc4_) : int(this.holdStart.y);
            this.rectHighY = _loc4_ < this.holdStart.y ? int(this.holdStart.y) : int(_loc4_);
            _loc5_ = this.rectHighX - this.rectLowX + 1;
            _loc6_ = this.rectHighY - this.rectLowY + 1;
            this.draggingRect.x = this.rectLowX * Constants.CELL * this.levelScale + this.level.x;
            this.draggingRect.y = this.rectLowY * Constants.CELL * this.levelScale + this.level.y;
            this.draggingRect.width = _loc5_ * Constants.CELL * this.levelScale;
            this.draggingRect.height = _loc6_ * Constants.CELL * this.levelScale;
            this.draggingRect.visible = true;
         }
      }
      
      private function mouseUp(param1:MouseEvent) : void
      {
         this.dragging = false;
         this.draggingRect.visible = this.editMode == Constants.EDITOR_PROPERTIES_MODE;
         var _loc2_:Point = this.level.globalToLocal(new Point(param1.stageX,param1.stageY));
         var _loc3_:int = _loc2_.x / Constants.CELL;
         var _loc4_:int = _loc2_.y / Constants.CELL;
         if(_loc3_ >= this.level.cellWidth || _loc4_ >= this.level.cellHeight)
         {
            return;
         }
         this.rectLowX = _loc3_ < this.holdStart.x ? int(_loc3_) : int(this.holdStart.x);
         this.rectHighX = _loc3_ < this.holdStart.x ? int(this.holdStart.x) : int(_loc3_);
         this.rectLowY = _loc4_ < this.holdStart.y ? int(_loc4_) : int(this.holdStart.y);
         this.rectHighY = _loc4_ < this.holdStart.y ? int(this.holdStart.y) : int(_loc4_);
         if(param1.stageX < stage.stageWidth - 140)
         {
            if(this.editMode != Constants.EDITOR_PROPERTIES_MODE)
            {
               if(this.holdStart != null)
               {
                  this.handleRectangle(this.rectLowX,this.rectHighX,this.rectLowY,this.rectHighY);
               }
            }
            else if(this.level.recipe.walls[_loc4_][_loc3_] < -1 || this.level.recipe.walls[_loc4_][_loc3_] > 1)
            {
               this.selectedCell = new Vector2i(_loc3_,_loc4_);
               this.selectedButton.reset();
               if(this.level.recipe.walls[_loc4_][_loc3_] < -1)
               {
                  this.selectedButton.toggle();
               }
               this.selectedHighlighter.x = _loc3_ * Constants.CELL * this.levelScale;
               this.selectedHighlighter.y = _loc4_ * Constants.CELL * this.levelScale;
               this.selectedHighlighter.scaleX = this.levelScale;
               this.selectedHighlighter.scaleY = this.levelScale;
            }
         }
         this.renderVisibleObjects();
         this.level.reset(this.level.recipe);
      }
      
      private function onKeyDown(param1:KeyboardEvent) : void
      {
         switch(param1.keyCode)
         {
            case Keyboard.A:
               this.level.x += Constants.CELL;
               break;
            case Keyboard.D:
               this.level.x -= Constants.CELL;
               break;
            case Keyboard.W:
               this.level.y += Constants.CELL;
               break;
            case Keyboard.S:
               this.level.y -= Constants.CELL;
               break;
            case Keyboard.Z:
               this.levelScale *= 1.2;
               break;
            case Keyboard.X:
               this.levelScale /= 1.2;
               break;
            case Keyboard.UP:
               this.addEdgeToTilesInRect(Cardinal.NY);
               break;
            case Keyboard.DOWN:
               this.addEdgeToTilesInRect(Cardinal.PY);
               break;
            case Keyboard.LEFT:
               this.addEdgeToTilesInRect(Cardinal.NX);
               break;
            case Keyboard.RIGHT:
               this.addEdgeToTilesInRect(Cardinal.PX);
         }
      }
      
      private function addEdgeToTilesInRect(param1:int) : void
      {
         var _loc3_:int = 0;
         var _loc4_:Array = null;
         var _loc2_:int = this.rectLowX;
         while(_loc2_ <= this.rectHighX)
         {
            _loc3_ = this.rectLowY;
            while(_loc3_ <= this.rectHighY)
            {
               if(Utils.inBounds(this.level.recipe.edges,_loc2_,_loc3_))
               {
                  (_loc4_ = Utils.getBooleansFromInt(this.level.recipe.edges[_loc3_][_loc2_]))[param1] = !_loc4_[param1];
                  this.level.recipe.edges[_loc3_][_loc2_] = Utils.getIntFromBooleans(_loc4_);
               }
               _loc3_++;
            }
            _loc2_++;
         }
         this.level.reset(this.level.recipe);
      }
      
      private function handleRectangle(param1:int, param2:int, param3:int, param4:int) : void
      {
         var cx:int = 0;
         var cy:int = 0;
         var leftTileCode:int = 0;
         var rightTileCode:int = 0;
         var leftEntityId:int = 0;
         var rightEntityId:int = 0;
         var upTileCode:int = 0;
         var downTileCode:int = 0;
         var upEntityId:int = 0;
         var downEntityId:int = 0;
         var lowX:int = param1;
         var highX:int = param2;
         var lowY:int = param3;
         var highY:int = param4;
         if(this.editMode == Constants.EDITOR_OBJECT_MODE)
         {
            cx = lowX;
            while(cx <= highX)
            {
               cy = lowY;
               while(cy <= highY)
               {
                  this.placeObject(cx,cy);
                  cy++;
               }
               cx++;
            }
            this.splitNeighbors(this.level.recipe.tileEntities,lowX,highX,lowY,highY);
            if(Key.isDown(Key.SPACE))
            {
               this.mergeRectangleTiles(this.level.recipe.tileEntities,lowX,highX,lowY,highY,function(param1:Vector2i, param2:int):Boolean
               {
                  return level.recipe.walls[param1.y][param1.x] == param2;
               });
            }
            if(this.typeSelected == Constants.WALL_TILE_CODE)
            {
               this.mergeRectangleTiles(this.level.recipe.tileEntities,0,this.level.cellWidth - 1,0,this.level.cellHeight - 1,function(param1:Vector2i, param2:int):Boolean
               {
                  return param2 == Constants.WALL_TILE_CODE && level.recipe.walls[param1.y][param1.x] == Constants.WALL_TILE_CODE;
               },[Constants.WALL_TILE_CODE]);
            }
         }
         else if(this.editMode == Constants.EDITOR_CLUMP_MODE)
         {
            this.mergeRectangleTiles(this.level.recipe.tileEntities,lowX,highX,lowY,highY,function(param1:Vector2i, param2:int):Boolean
            {
               return level.recipe.walls[param1.y][param1.x] == param2;
            });
         }
         else if(this.editMode == Constants.EDITOR_CONNECTOR_MODE)
         {
            cx = lowX;
            while(cx <= highX - 1)
            {
               cy = lowY;
               while(cy <= highY)
               {
                  leftTileCode = this.level.recipe.walls[cy][cx];
                  rightTileCode = this.level.recipe.walls[cy][cx + 1];
                  leftEntityId = this.level.recipe.tileEntities[cy][cx];
                  rightEntityId = this.level.recipe.tileEntities[cy][cx + 1];
                  if(this.canConnect(leftTileCode,rightTileCode,leftEntityId,rightEntityId))
                  {
                     this.connect(new Vector2i(cx,cy),Cardinal.PX);
                  }
                  cy++;
               }
               cx++;
            }
            cx = lowX;
            while(cx <= highX)
            {
               cy = lowY;
               while(cy <= highY - 1)
               {
                  upTileCode = this.level.recipe.walls[cy][cx];
                  downTileCode = this.level.recipe.walls[cy + 1][cx];
                  upEntityId = this.level.recipe.tileEntities[cy][cx];
                  downEntityId = this.level.recipe.tileEntities[cy + 1][cx];
                  if(this.canConnect(upTileCode,downTileCode,upEntityId,downEntityId))
                  {
                     this.connect(new Vector2i(cx,cy),Cardinal.PY);
                  }
                  cy++;
               }
               cx++;
            }
         }
      }
      
      private function connect(param1:Vector2i, param2:int) : void
      {
         var _loc3_:Vector2i = Cardinal.getVector2i(param2).AddV(param1);
         var _loc4_:Array = Utils.getBooleansFromInt(this.level.recipe.islands[param1.y][param1.x]);
         var _loc5_:Array = Utils.getBooleansFromInt(this.level.recipe.islands[_loc3_.y][_loc3_.x]);
         _loc4_[param2] = true;
         _loc5_[Cardinal.getOpposite(param2)] = true;
         this.level.recipe.islands[param1.y][param1.x] = Utils.getIntFromBooleans(_loc4_);
         this.level.recipe.islands[_loc3_.y][_loc3_.x] = Utils.getIntFromBooleans(_loc5_);
      }
      
      private function canConnect(param1:int, param2:int, param3:int, param4:int) : Boolean
      {
         return param1 != Constants.EMPTY_TILE_CODE && param2 != Constants.EMPTY_TILE_CODE && Constants.SINGLE_TILE_TYPES.indexOf(param1) == -1 && Constants.SINGLE_TILE_TYPES.indexOf(param2) == -1 && param3 != param4;
      }
      
      private function connectAllEntities() : void
      {
         Utils.foreach(this.level.recipe.tileEntities,function(param1:int, param2:int, param3:int):void
         {
            var _loc4_:int = 0;
            var _loc5_:Vector2i = null;
            var _loc6_:Vector2i = null;
            var _loc7_:int = 0;
            for each(_loc4_ in Cardinal.DIRECTIONS)
            {
               _loc5_ = new Vector2i(param1,param2);
               _loc6_ = Cardinal.getVector2i(_loc4_).AddV(_loc5_);
               if((_loc7_ = Utils.index(level.recipe.tileEntities,_loc6_.x,_loc6_.y)) != 0 && param3 == _loc7_)
               {
                  connect(_loc5_,_loc4_);
               }
            }
         });
      }
      
      private function splitNeighbors(param1:Array, param2:int, param3:int, param4:int, param5:int) : void
      {
         var _loc10_:Vector2i = null;
         var _loc6_:Array = [];
         var _loc7_:int = param2;
         while(_loc7_ <= param3)
         {
            _loc6_.push(new Vector2i(_loc7_,param4 - 1));
            _loc6_.push(new Vector2i(_loc7_,param5 + 1));
            _loc7_++;
         }
         var _loc8_:int = param4;
         while(_loc8_ <= param5)
         {
            _loc6_.push(new Vector2i(param2 - 1,_loc8_));
            _loc6_.push(new Vector2i(param3 + 1,_loc8_));
            _loc8_++;
         }
         var _loc9_:int = getMaxId(param1) + 1;
         for each(_loc10_ in _loc6_)
         {
            this.giveNewId(param1,_loc10_,_loc9_);
            _loc9_ += 1;
         }
         this.connectAllEntities();
         normalizeIds(param1);
      }
      
      private function giveNewId(param1:Array, param2:Vector2i, param3:int) : void
      {
         var entityId:int = 0;
         var grid:Array = param1;
         var entCoor:Vector2i = param2;
         var newId:int = param3;
         entityId = Utils.index(grid,entCoor.x,entCoor.y);
         if(entityId == 0)
         {
            return;
         }
         var isNeighbor:Function = function(param1:Vector2i):Boolean
         {
            return entityId == grid[param1.y][param1.x];
         };
         var processNode:Function = function(param1:Vector2i):Boolean
         {
            grid[param1.y][param1.x] = newId;
            return false;
         };
         Utils.BFS(Utils.getW(grid),Utils.getH(grid),entCoor,isNeighbor,processNode);
      }
      
      private function mergeRectangleTiles(param1:Array, param2:int, param3:int, param4:int, param5:int, param6:Function, param7:Array = null) : void
      {
         var nextId:int = 0;
         var cy:int = 0;
         var objCode:int = 0;
         var cantMergeCoor:Boolean = false;
         var idsBeingConnected:Dictionary = null;
         var isNeighbor:Function = null;
         var processNode:Function = null;
         var grid:Array = param1;
         var lowX:int = param2;
         var highX:int = param3;
         var lowY:int = param4;
         var highY:int = param5;
         var canMergeWith:Function = param6;
         var onlyMergeTypes:Array = param7;
         nextId = getMaxId(grid) + 1;
         var minValOfNewIds:int = nextId;
         var cx:int = lowX;
         while(cx <= highX)
         {
            cy = lowY;
            while(cy <= highY)
            {
               objCode = this.level.recipe.walls[cy][cx];
               cantMergeCoor = onlyMergeTypes != null && onlyMergeTypes.indexOf(objCode) == -1;
               if(!(objCode == Constants.EMPTY_TILE_CODE || grid[cy][cx] >= minValOfNewIds || cantMergeCoor))
               {
                  idsBeingConnected = new Dictionary();
                  isNeighbor = function(param1:Vector2i):Boolean
                  {
                     var _loc2_:Boolean = param1.x >= lowX && param1.x <= highX && param1.y >= lowY && param1.y <= highY;
                     var _loc3_:Boolean = idsBeingConnected[grid[param1.y][param1.x]];
                     return canMergeWith(param1,objCode) && (_loc3_ || _loc2_);
                  };
                  processNode = function(param1:Vector2i):Boolean
                  {
                     idsBeingConnected[grid[param1.y][param1.x]] = true;
                     grid[param1.y][param1.x] = nextId;
                     return false;
                  };
                  Utils.BFS(Utils.getW(grid),Utils.getH(grid),new Vector2i(cx,cy),isNeighbor,processNode);
                  nextId += 1;
               }
               cy++;
            }
            cx++;
         }
         this.connectAllEntities();
         normalizeIds(grid);
      }
      
      private function clearConnectors(param1:int, param2:int) : void
      {
         var _loc3_:int = 0;
         var _loc4_:Vector2i = null;
         var _loc5_:Array = null;
         for each(_loc3_ in Cardinal.DIRECTIONS)
         {
            this.level.recipe.islands[param2][param1] = 0;
            _loc4_ = Cardinal.getVector2i(_loc3_).Add(param1,param2);
            if(Utils.inBounds(this.level.recipe.islands,_loc4_.x,_loc4_.y))
            {
               (_loc5_ = Utils.getBooleansFromInt(this.level.recipe.islands[_loc4_.y][_loc4_.x]))[Cardinal.getOpposite(_loc3_)] = false;
               this.level.recipe.islands[_loc4_.y][_loc4_.x] = Utils.getIntFromBooleans(_loc5_);
            }
         }
      }
      
      private function placeObject(param1:int, param2:int) : void
      {
         var type:int = 0;
         var cellX:int = param1;
         var cellY:int = param2;
         var ps:Array = this.level.recipe.playerStart;
         if(cellX == ps[0] && cellY == ps[1])
         {
            return;
         }
         this.level.recipe.walls[cellY][cellX] = Constants.EMPTY_TILE_CODE;
         this.clearConnectors(cellX,cellY);
         this.level.recipe.edges[cellY][cellX] = 0;
         this.level.recipe.tileEntities[cellY][cellX] = Constants.EMPTY_TILE_CODE;
         this.level.recipe.freeEntities = this.level.recipe.freeEntities.filter(function(param1:*):*
         {
            return param1[0] != cellX || param1[1] != cellY;
         });
         var tileEntityPlaced:Boolean = this.typeSelected is int;
         if(tileEntityPlaced)
         {
            type = int(this.typeSelected);
            this.level.recipe.walls[cellY][cellX] = type;
            this.level.recipe.tileEntities[cellY][cellX] = type == Constants.EMPTY_TILE_CODE ? 0 : getMaxId(this.level.recipe.tileEntities) + 1;
         }
         else if(this.typeSelected == "player")
         {
            this.level.recipe.playerStart = [cellX,cellY];
         }
         else
         {
            this.level.recipe.freeEntities.push([cellX,cellY,this.typeSelected]);
         }
      }
   }
}
