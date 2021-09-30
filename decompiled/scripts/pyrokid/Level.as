package pyrokid
{
   import flash.display.Bitmap;
   import flash.display.DisplayObject;
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.text.TextField;
   import flash.text.TextFormat;
   import flash.text.TextFormatAlign;
   import flash.utils.Dictionary;
   import physics.IslandSimulator;
   import physics.PRect;
   import physics.PhysBox;
   import physics.PhysIsland;
   import physics.ViewPIsland;
   import physics.ViewPRect;
   import pyrokid.entities.BurnForever;
   import pyrokid.entities.BurnForeverEnemy;
   import pyrokid.entities.BurnQuickly;
   import pyrokid.entities.Exit;
   import pyrokid.entities.FreeEntity;
   import pyrokid.entities.Mob;
   import pyrokid.entities.NonFlammableTile;
   import pyrokid.entities.Player;
   import pyrokid.entities.Spider;
   import pyrokid.entities.TileEntity;
   import pyrokid.entities.WaterBat;
   import pyrokid.tools.Key;
   import pyrokid.tools.RingBuffer;
   import ui.LevelsInfo;
   
   public class Level extends Sprite
   {
       
      
      public var walls:Array;
      
      public var recipe:Object;
      
      public var islands:Array;
      
      public var columns:Array;
      
      public var projectiles:RingBuffer;
      
      public var briefClips:RingBuffer;
      
      public var delayedFunctions:Dictionary;
      
      public var background:CaveBackground;
      
      public var islandViews:Array;
      
      public var rectViews:Array;
      
      public var player:Player;
      
      public var enemies:Array;
      
      public var smooshedPlayer:BriefClip;
      
      public var tileEntityGrid:Array;
      
      public var movingTiles:Array;
      
      public var onFire:Array;
      
      public var frameCount:int;
      
      public var dirty:Boolean;
      
      public var gameOverState:int;
      
      public var talisman:MovieClip;
      
      public function Level(param1:Object)
      {
         super();
         this.reset(param1);
      }
      
      private static function findParentIsland(param1:Array, param2:Array) : Island
      {
         var coors:Array = param1;
         var islandViews:Array = param2;
         return islandViews.filter(function(param1:*):*
         {
            var _loc2_:* = param1.phys;
            var _loc3_:* = coors[0].copy().SubV(_loc2_.globalAnchor.copyAsVec2i());
            return Utils.index(_loc2_.tileGrid,_loc3_.x,_loc3_.y) != null;
         })[0].sprite;
      }
      
      public function get cellWidth() : int
      {
         return this.walls[0].length;
      }
      
      public function get cellHeight() : int
      {
         return this.walls.length;
      }
      
      public function get worldWidth() : int
      {
         return this.cellWidth * Constants.CELL;
      }
      
      public function get worldHeight() : int
      {
         return this.cellHeight * Constants.CELL;
      }
      
      public function reset(param1:Object) : void
      {
         var _loc2_:FreeEntity = null;
         Main.log.logBeginLevel(LevelsInfo.currLevel);
         LevelRecipe.complete(param1);
         Key.reset();
         Utils.removeAllChildren(this);
         this.recipe = param1;
         this.walls = param1.walls;
         this.onFire = [];
         this.rectViews = [];
         this.movingTiles = [];
         this.enemies = [];
         this.islands = [];
         this.islandViews = [];
         this.tileEntityGrid = Utils.newArrayOfSize(this.walls);
         this.frameCount = 0;
         this.dirty = false;
         this.gameOverState = Constants.GAME_NOT_OVER;
         this.smooshedPlayer = null;
         this.background = new CaveBackground(Utils.getW(this.walls),Utils.getH(this.walls));
         this.addChild(this.background);
         this.setupTiles();
         this.setupFreeEntities();
         for each(_loc2_ in this.enemies)
         {
            if(_loc2_ is Exit)
            {
               setChildIndex(_loc2_,0);
            }
         }
         setChildIndex(this.background,0);
         this.setupMiscellaneous();
      }
      
      private function setupTiles() : void
      {
         var physTiles:Array = null;
         var physIsland:PhysIsland = null;
         var tileEntityList:Array = null;
         var strId:String = null;
         var connectorGrid:Array = null;
         var entity:TileEntity = null;
         var gameIsland:Island = null;
         var id:int = 0;
         var coors:Array = null;
         var tileCode:int = 0;
         var parentIsland:Island = null;
         var globalAnchor:Vector2 = null;
         var coor:Vector2i = null;
         var entityCellMap:Dictionary = Utils.getCellMap(this.recipe.tileEntities);
         physTiles = Utils.newArrayOfSize(this.recipe.walls);
         Utils.foreach(physTiles,function(param1:int, param2:int, param3:TileEntity):void
         {
            var _loc4_:Array = null;
            var _loc5_:* = false;
            if(recipe.walls[param2][param1] != Constants.EMPTY_TILE_CODE)
            {
               _loc4_ = Utils.getBooleansFromInt(recipe.islands[param2][param1]);
               _loc5_ = Constants.GROUNDED_TYPES.indexOf(recipe.walls[param2][param1]) == -1;
               physTiles[param2][param1] = new PhysBox(_loc4_,_loc5_);
            }
         });
         this.islands = IslandSimulator.ConstructIslands(physTiles);
         this.columns = IslandSimulator.ConstructCollisionColumns(this.islands);
         for each(physIsland in this.islands)
         {
            gameIsland = new Island(physIsland);
            this.islandViews.push(new ViewPIsland(gameIsland,physIsland));
         }
         tileEntityList = [];
         for(strId in entityCellMap)
         {
            id = int(strId);
            coors = entityCellMap[id];
            tileCode = this.recipe.walls[coors[0].y][coors[0].x];
            parentIsland = findParentIsland(coors,this.islandViews);
            entity = this.getEntityFromTileCode(tileCode);
            addChild(entity);
            tileEntityList.push(entity);
            globalAnchor = Utils.getAnchor(coors);
            entity.cells = coors.map(function(param1:*):*
            {
               return param1.copy().SubV(globalAnchor.copyAsVec2i());
            });
            entity.x = globalAnchor.x * Constants.CELL;
            entity.y = globalAnchor.y * Constants.CELL;
            entity.finalizeCells(this,globalAnchor.copyAsVec2i());
            parentIsland.addEntity(entity,globalAnchor);
            entity.addEdges(this.recipe.edges);
            for each(coor in coors)
            {
               this.tileEntityGrid[coor.y][coor.x] = entity;
            }
         }
         connectorGrid = Connector.getActualConnectedGrid(this.recipe.islands,this.tileEntityGrid);
         for each(entity in tileEntityList)
         {
            entity.addEdges(connectorGrid,true);
         }
         for each(entity in tileEntityList)
         {
            entity.setUpPartnerConnectors();
         }
         for each(entity in tileEntityList)
         {
            entity.clearConnectorDict();
         }
      }
      
      private function getEntityFromTileCode(param1:int) : TileEntity
      {
         var _loc2_:TileEntity = null;
         var _loc3_:int = Math.abs(param1);
         if(_loc3_ == Constants.OIL_TILE_CODE)
         {
            return new BurnForever(0,0,_loc3_);
         }
         if(_loc3_ == Constants.WOOD_TILE_CODE)
         {
            return new BurnQuickly(0,0,_loc3_);
         }
         return new NonFlammableTile(0,0,_loc3_);
      }
      
      private function setupFreeEntities() : void
      {
         var _loc2_:FreeEntity = null;
         this.player = new Player(this);
         this.initializeFreeEntity(this.player,this.recipe.playerStart[0],this.recipe.playerStart[1]);
         var _loc1_:int = 0;
         while(_loc1_ < this.recipe.freeEntities.length)
         {
            if(this.recipe.freeEntities[_loc1_][2] == Constants.SPIDER_CODE)
            {
               _loc2_ = new Spider(this,1);
            }
            else if(this.recipe.freeEntities[_loc1_][2] == Constants.SPIDER_ARMOR_CODE)
            {
               _loc2_ = new Spider(this,2);
            }
            else if(this.recipe.freeEntities[_loc1_][2] == Constants.BAT_CODE)
            {
               _loc2_ = new WaterBat(this);
            }
            else if(this.recipe.freeEntities[_loc1_][2] == Constants.BOMB_EXIT_CODE)
            {
               _loc2_ = new Exit(this);
            }
            else if(this.recipe.freeEntities[_loc1_][2] == Constants.HOLE_EXIT_CODE)
            {
               _loc2_ = new Exit(this,true);
            }
            else if(LevelsInfo.currLevel == 4)
            {
               _loc2_ = new Mob(this);
            }
            else
            {
               _loc2_ = new BurnForeverEnemy(this);
            }
            this.initializeFreeEntity(_loc2_,this.recipe.freeEntities[_loc1_][0],this.recipe.freeEntities[_loc1_][1]);
            this.enemies.push(_loc2_);
            _loc1_++;
         }
      }
      
      private function initializeFreeEntity(param1:FreeEntity, param2:int, param3:int) : void
      {
         Utils.centerInCell(param1,param2,param3);
         addChild(param1);
         this.rectViews.push(new ViewPRect(param1,param1.genPhysRect()));
      }
      
      private function setupMiscellaneous() : void
      {
         var self:Level = null;
         self = this;
         this.projectiles = new RingBuffer(50,function(param1:Object):*
         {
            var _loc4_:* = undefined;
            var _loc5_:* = undefined;
            var _loc2_:* = param1 as ProjectileBall;
            var _loc3_:* = new Vector2(_loc2_.x,_loc2_.y);
            var _loc6_:* = new Vector2();
            if(_loc2_ is Fireball)
            {
               if(_loc2_.fizzOut)
               {
                  _loc5_ = new Embedded.FireballFizzSWF() as MovieClip;
               }
               else
               {
                  _loc5_ = new Embedded.FiresplooshSWF() as MovieClip;
               }
               (_loc4_ = new BriefClip(_loc3_,_loc5_,_loc6_)).rotation = _loc2_.rotation;
               self.addChild(_loc4_);
               self.briefClips.push(_loc4_);
            }
            self.removeChild(_loc2_);
         });
         this.briefClips = new RingBuffer(50,function(param1:Object):*
         {
            var _loc2_:* = undefined;
            if(param1 is DisplayObject)
            {
               _loc2_ = param1 as DisplayObject;
               self.removeChild(_loc2_);
               if(param1.clip is Player || param1.clip is Embedded.PlayerDieFireSWF || param1.clip is Embedded.PlayerDiePainSWF)
               {
                  gameOverState = Constants.GAME_OVER_COMPLETE;
               }
            }
         });
         this.addTutorialMessage();
         this.addTutorialImages();
         this.delayedFunctions = new Dictionary();
      }
      
      private function addTutorialImages() : void
      {
         if(LevelsInfo.currLevel == -1)
         {
            return;
         }
         var _loc1_:Array = LevelsInfo.tutorialHouses[LevelsInfo.currLevel];
         var _loc2_:Array = LevelsInfo.tutorialBuildings[LevelsInfo.currLevel];
         var _loc3_:Vector2i = LevelsInfo.tutorialTalisman[LevelsInfo.currLevel];
         if(LevelsInfo.currLevel == 1 || LevelsInfo.currLevel == 2)
         {
            this.player.fireDisabled = true;
         }
         if(_loc3_ != null)
         {
            this.talisman = new Embedded.Talisman() as MovieClip;
            this.talisman.x = _loc3_.x * Constants.CELL;
            this.talisman.y = _loc3_.y * Constants.CELL;
            addChild(this.talisman);
            setChildIndex(this.talisman,1);
         }
         this.addImages(_loc1_,"house");
         this.addImages(_loc2_,"building");
      }
      
      function getTutorialImage(param1:String) : Bitmap
      {
         var _loc2_:Bitmap = null;
         var _loc3_:Bitmap = null;
         if(param1 == "house")
         {
            _loc2_ = new Embedded.HouseBMP() as Bitmap;
            _loc2_.y = -50;
            return _loc2_;
         }
         if(param1 == "building")
         {
            _loc3_ = new Embedded.BrickBuildingBMP() as Bitmap;
            _loc3_.height = 202;
            return _loc3_;
         }
         return null;
      }
      
      public function addImages(param1:Array, param2:String) : void
      {
         var _loc3_:Vector2i = null;
         var _loc4_:TileEntity = null;
         var _loc5_:int = 0;
         if(param1 != undefined && param1 != null)
         {
            for each(_loc3_ in param1)
            {
               if((_loc4_ = Utils.index(this.tileEntityGrid,_loc3_.x,_loc3_.y)) != null)
               {
                  _loc4_.addChild(this.getTutorialImage(param2));
                  if(param2 == "house")
                  {
                     _loc5_ = 0;
                     while(_loc5_ < 3)
                     {
                        _loc4_.addFireLocation(new Vector2i(_loc5_,-1));
                        _loc4_.visualCells.push(new Vector2i(_loc5_,-1));
                        _loc5_++;
                     }
                  }
               }
            }
         }
      }
      
      public function addMessage(param1:String, param2:Number, param3:Number) : void
      {
         var _loc5_:TextFormat = null;
         var _loc4_:TextField;
         (_loc4_ = new TextField()).width = 800;
         _loc4_.height = 600;
         _loc4_.text = param1;
         _loc4_.y = param3;
         _loc4_.x = param2;
         if(_loc5_ == null)
         {
            (_loc5_ = new TextFormat()).align = TextFormatAlign.CENTER;
            _loc5_.font = "Impact";
            _loc5_.size = 20;
            _loc5_.color = 16777215;
         }
         _loc4_.selectable = false;
         _loc4_.setTextFormat(_loc5_);
         addChild(_loc4_);
      }
      
      private function addTutorialMessage() : void
      {
         var _loc2_:Array = null;
         var _loc1_:Array = LevelsInfo.getTutorialMessages(LevelsInfo.currLevel);
         for each(_loc2_ in _loc1_)
         {
            this.addMessage(_loc2_[1],_loc2_[0].x,_loc2_[0].y);
         }
      }
      
      private function getProjectileDirection(param1:ProjectileBall) : int
      {
         if(param1.speedY > 0)
         {
            return Cardinal.PY;
         }
         if(param1.speedY < 0)
         {
            return Cardinal.NY;
         }
         if(param1.speedX > 0)
         {
            return Cardinal.PX;
         }
         if(param1.speedX < 0)
         {
            return Cardinal.NX;
         }
         return -1;
      }
      
      private function projectileImpact(param1:ProjectileBall, param2:TileEntity, param3:Vector2i, param4:Vector2) : void
      {
         var _loc6_:BurnForever = null;
         this.projectiles.markForDeletion(param1);
         var _loc5_:int = this.getProjectileDirection(param1);
         if(param1 is Fireball)
         {
            param2.ignite(this,param3,_loc5_);
            Main.log.logFireballIgnite(param4.x,param4.y,Object(param2).constructor);
         }
         else if(param1 is Waterball)
         {
            if(param2 is BurnForever)
            {
               (_loc6_ = param2 as BurnForever).douse(this);
            }
         }
      }
      
      public function projectileUpdate() : void
      {
         var _loc2_:ProjectileBall = null;
         var _loc3_:PRect = null;
         var _loc4_:Vector2 = null;
         var _loc5_:Vector2 = null;
         var _loc6_:ViewPIsland = null;
         var _loc7_:int = 0;
         var _loc8_:int = 0;
         var _loc9_:TileEntity = null;
         var _loc10_:FreeEntity = null;
         var _loc11_:int = 0;
         var _loc12_:PhysIsland = null;
         var _loc13_:int = 0;
         var _loc14_:int = 0;
         var _loc15_:Vector2i = null;
         var _loc16_:Vector2 = null;
         var _loc17_:BurnForeverEnemy = null;
         var _loc18_:ProjectileBall = null;
         var _loc1_:int = 0;
         while(_loc1_ < this.projectiles.size())
         {
            _loc2_ = this.projectiles.get(_loc1_) as ProjectileBall;
            _loc2_.x += _loc2_.speedX;
            _loc2_.y += _loc2_.speedY;
            _loc3_ = new PRect();
            _loc4_ = new Vector2(_loc2_.x,_loc2_.y).DivD(Constants.CELL);
            _loc3_.center.Set(_loc4_.x,_loc4_.y);
            _loc3_.halfSize.Set(0,0);
            _loc5_ = new Vector2();
            for each(_loc6_ in this.movingTiles)
            {
               _loc12_ = _loc6_.phys;
               if(PRect.intersects(_loc12_.getBoundingRect(),_loc3_,_loc5_))
               {
                  _loc5_.SetV(_loc3_.center);
                  _loc5_.SubV(_loc12_.globalAnchor);
                  _loc13_ = int(_loc5_.x);
                  _loc14_ = int(_loc5_.y);
                  if(!(_loc13_ < 0 || _loc13_ >= _loc12_.tilesWidth))
                  {
                     if(!(_loc14_ < 0 || _loc14_ >= _loc12_.tilesHeight))
                     {
                        if(_loc12_.tileGrid[_loc14_][_loc13_] != null)
                        {
                           _loc9_ = _loc6_.sprite.tileEntityGrid[_loc14_][_loc13_];
                           _loc15_ = new Vector2i(_loc13_,_loc14_).SubV(_loc9_.islandAnchor);
                           _loc16_ = new Vector2(_loc2_.x / Constants.CELL,_loc2_.y / Constants.CELL);
                           this.projectileImpact(_loc2_,_loc9_,_loc15_,_loc16_);
                        }
                     }
                  }
               }
            }
            _loc7_ = Utils.realToCell(_loc2_.x);
            _loc8_ = Utils.realToCell(_loc2_.y);
            if((_loc9_ = Utils.index(this.tileEntityGrid,_loc7_,_loc8_)) != null)
            {
               _loc15_ = new Vector2i(_loc7_,_loc8_).SubV(_loc9_.getGlobalAnchorAsVec2i());
               this.projectileImpact(_loc2_,_loc9_,_loc15_,new Vector2(_loc7_,_loc8_));
            }
            for each(_loc10_ in this.enemies)
            {
               if(_loc10_.isTouching(_loc2_))
               {
                  if(_loc2_ is Fireball && !_loc10_.projectileCanPassThrough())
                  {
                     this.projectiles.markForDeletion(_loc2_);
                     _loc10_.ignite(this);
                     Main.log.logFireballIgnite(_loc7_,_loc8_,Object(_loc10_).constructor);
                     break;
                  }
                  if(_loc2_ is Waterball && _loc10_ is BurnForeverEnemy)
                  {
                     (_loc17_ = _loc10_ as BurnForeverEnemy).douse(this);
                     break;
                  }
               }
            }
            if(_loc2_ is Waterball)
            {
               if(this.player.isTouching(_loc2_))
               {
                  this.projectiles.markForDeletion(_loc2_);
                  this.player.damageFromEnemyContact(this);
               }
            }
            _loc11_ = 0;
            while(_loc11_ < this.projectiles.size())
            {
               _loc18_ = this.projectiles.get(_loc11_) as ProjectileBall;
               if(_loc2_ is Fireball && _loc18_ is Waterball)
               {
                  if(Utils.distance(_loc2_,_loc18_) < 20)
                  {
                     this.projectiles.markForDeletion(_loc2_);
                     this.projectiles.markForDeletion(_loc18_);
                  }
               }
               _loc11_++;
            }
            if(_loc2_.isDead())
            {
               if(_loc2_ is Fireball)
               {
                  Fireball(_loc2_).fizzOut = true;
               }
               this.projectiles.markForDeletion(_loc2_);
            }
            _loc1_++;
         }
         this.projectiles.deleteAllMarked();
      }
      
      public function launchFireball(param1:Number, param2:int) : void
      {
         var _loc3_:Fireball = new Fireball();
         _loc3_.setRange(param1);
         _loc3_.x = this.player.getCenter().x;
         _loc3_.y = this.player.getCenter().y;
         _loc3_.setDirection(param2);
         this.projectiles.push(_loc3_);
         addChild(_loc3_);
         SoundManager.playSound(Embedded.fireballSound);
      }
      
      public function launchWaterball(param1:int, param2:int, param3:Number, param4:int, param5:Vector2) : void
      {
         var _loc6_:Waterball;
         (_loc6_ = new Waterball()).x = param1;
         _loc6_.y = param2;
         var _loc7_:Vector2 = new Vector2(0,0);
         if(param4 == Constants.DIR_LEFT)
         {
            _loc7_.x = -Constants.WATERBALL_SPEED;
         }
         else if(param4 == Constants.DIR_RIGHT)
         {
            _loc7_.x = Constants.WATERBALL_SPEED;
         }
         else if(param4 == Constants.DIR_UP)
         {
            _loc7_.y = -Constants.WATERBALL_SPEED;
         }
         else if(param4 == Constants.DIR_DOWN)
         {
            _loc7_.y = Constants.WATERBALL_SPEED;
         }
         _loc7_.AddV(param5);
         _loc6_.setVelocity(_loc7_);
         this.projectiles.push(_loc6_);
         addChild(_loc6_);
      }
      
      public function removeDead() : void
      {
         var islandView:ViewPIsland = null;
         var brokenIslandView:ViewPIsland = null;
         var gameIsland:Island = null;
         var physIsland:PhysIsland = null;
         var entityRemoved:Boolean = false;
         var brokenPhysIsland:PhysIsland = null;
         var entities:Array = null;
         var newIslandViews:Array = null;
         var newIslands:Array = null;
         var newPhysIsland:PhysIsland = null;
         var entity:TileEntity = null;
         var newGameIsland:Island = null;
         var newIslandView:ViewPIsland = null;
         var x:int = 0;
         if(!this.dirty)
         {
            return;
         }
         var self:Level = this;
         this.rectViews = this.rectViews.filter(function(param1:*):*
         {
            return !param1.sprite.isDead;
         });
         this.enemies = this.enemies.filter(function(param1:*):*
         {
            if(param1.isDead)
            {
               removeChild(param1);
            }
            return !param1.isDead;
         });
         var brokenIslandViews:Array = [];
         var oldIslandViews:* = this.islandViews;
         this.islandViews = [];
         this.islands = [];
         for each(islandView in oldIslandViews)
         {
            gameIsland = islandView.sprite;
            physIsland = islandView.phys;
            entityRemoved = false;
            gameIsland.entityList = gameIsland.entityList.filter(function(param1:*):*
            {
               var _loc2_:* = undefined;
               if(param1.isDead)
               {
                  param1.removePartnerConnectors();
                  removeChild(param1);
                  for each(_loc2_ in param1.coorsInIsland())
                  {
                     gameIsland.tileEntityGrid[_loc2_.y][_loc2_.x] = null;
                     physIsland.tileGrid[_loc2_.y][_loc2_.x] = null;
                  }
                  entityRemoved = true;
               }
               return !param1.isDead;
            });
            if(entityRemoved)
            {
               brokenIslandViews.push(islandView);
            }
            else
            {
               this.islands.push(physIsland);
               this.islandViews.push(islandView);
            }
         }
         for each(brokenIslandView in brokenIslandViews)
         {
            if(brokenIslandView.sprite.entityList.length != 0)
            {
               brokenPhysIsland = brokenIslandView.phys;
               entities = brokenIslandView.sprite.entityList;
               newIslandViews = [];
               newIslands = IslandSimulator.ConstructIslands(brokenPhysIsland.tileGrid);
               for each(newPhysIsland in newIslands)
               {
                  newPhysIsland.velocity = brokenPhysIsland.velocity.copy();
                  newGameIsland = new Island(newPhysIsland);
                  this.islands.push(newPhysIsland);
                  newIslandView = new ViewPIsland(newGameIsland,newPhysIsland);
                  newIslandViews.push(newIslandView);
                  this.islandViews.push(newIslandView);
               }
               for each(entity in entities)
               {
                  gameIsland = findParentIsland(entity.coorsInIsland(),newIslandViews);
                  gameIsland.addEntity(entity,entity.islandAnchor.copyAsVec2());
               }
               for each(newPhysIsland in newIslands)
               {
                  newPhysIsland.globalAnchor.AddV(brokenPhysIsland.globalAnchor);
                  newPhysIsland.resetBoundingRect();
               }
            }
         }
         this.movingTiles = [];
         for each(islandView in this.islandViews)
         {
            if(islandView.sprite.isMoving())
            {
               this.movingTiles.push(islandView);
            }
         }
         if(brokenIslandViews.length > 0)
         {
            this.columns = IslandSimulator.ConstructCollisionColumns(this.islands);
         }
         var y:int = 0;
         while(y < this.tileEntityGrid.length)
         {
            x = 0;
            while(x < this.tileEntityGrid[0].length)
            {
               entity = this.tileEntityGrid[y][x];
               if(entity != null && entity.isDead)
               {
                  this.tileEntityGrid[y][x] = null;
               }
               x++;
            }
            y++;
         }
         this.onFire = this.onFire.filter(function(param1:*):*
         {
            return !param1.isDead;
         });
         if(this.gameOverState == Constants.GAME_OVER_FADING)
         {
            if(this.player.parent == this)
            {
               removeChild(this.player);
            }
         }
      }
      
      public function addBriefClip(param1:Class, param2:Vector2) : *
      {
         var _loc3_:MovieClip = new param1() as MovieClip;
         var _loc4_:BriefClip = new BriefClip(param2,_loc3_);
         this.briefClips.push(_loc4_);
         addChild(_loc4_);
      }
   }
}
