package pyrokid
{
   import flash.display.MovieClip;
   import flash.display.Sprite;
   import flash.events.Event;
   import flash.events.KeyboardEvent;
   import flash.geom.Point;
   import flash.ui.Keyboard;
   import flash.utils.Dictionary;
   import physics.PhysDebugLayer;
   import physics.ViewPIsland;
   import physics.ViewPRect;
   import pyrokid.entities.Exit;
   import pyrokid.entities.FreeEntity;
   import pyrokid.entities.TileEntity;
   import pyrokid.graphics.Camera.CameraController;
   import pyrokid.graphics.Filmstrip;
   import pyrokid.tools.Benchmarker;
   import pyrokid.tools.Camera;
   import ui.LevelsInfo;
   import ui.TimerHUD;
   import ui.buttons.CoreButton;
   import ui.playstates.BasePlayState;
   import ui.playstates.PauseMenu;
   import ui.playstates.StateController;
   
   public class GameController extends Sprite
   {
       
      
      public var editorMode:Boolean = false;
      
      private var levelEditor:LevelEditor;
      
      private var playerWon:Boolean = false;
      
      private var camera:Camera;
      
      private var cameraController:CameraController;
      
      private var largeZoom:Number = 1.0;
      
      public var level:Level;
      
      public var spotlight:Spotlight;
      
      public var timerHUD:TimerHUD;
      
      private var physDebug:PhysDebugLayer;
      
      public var isPaused:Boolean = false;
      
      private var pauseMenu:BasePlayState;
      
      private var benchmarker:Benchmarker;
      
      private var levelJustWon:Boolean = false;
      
      public function GameController(param1:Object)
      {
         super();
         this.benchmarker = new Benchmarker(["PHYSICS","FIRE","BETWEEN UPDATES","REMOVE DEAD"]);
         Main.MainStage.addEventListener(KeyboardEvent.KEY_UP,this.levelEditorListener);
         Main.MainStage.addEventListener(KeyboardEvent.KEY_UP,this.keyboardActionListener);
         this.initializeLevelAndEditor(param1);
         var _loc2_:* = 0;
         while(_loc2_ < 30)
         {
            _loc2_++;
         }
         if(Constants.LEVEL_EDITOR_ENABLED)
         {
            this.addSkipButton();
         }
      }
      
      public function destroy() : void
      {
         var _loc1_:Vector2i = null;
         if(!this.levelJustWon)
         {
            _loc1_ = this.level.player.getCenter();
            Main.log.logDeath(Utils.realToCell(_loc1_.x),Utils.realToCell(_loc1_.y),Constants.DEATH_BY_RESTART,this.level.frameCount);
         }
         Main.log.logEndLevel();
         Main.MainStage.removeEventListener(KeyboardEvent.KEY_UP,this.levelEditorListener);
         Main.MainStage.removeEventListener(KeyboardEvent.KEY_UP,this.keyboardActionListener);
         removeEventListener(Event.ENTER_FRAME,this.update);
         this.levelJustWon = false;
      }
      
      private function initializeLevelAndEditor(param1:Object) : void
      {
         this.reloadLevel(param1);
         this.levelEditor = new LevelEditor(this.level);
         this.levelEditor.reloadLevel = this.reloadLevel;
         addChild(this.levelEditor);
         addEventListener(Event.ENTER_FRAME,this.update);
      }
      
      public function reloadLevel(param1:*) : void
      {
         if(this.level != null)
         {
            removeChild(this.camera);
         }
         if(this.spotlight != null && this.contains(this.spotlight))
         {
            this.removeChild(this.spotlight);
         }
         if(this.timerHUD != null && this.contains(this.timerHUD))
         {
            this.removeChild(this.timerHUD);
         }
         this.level = new Level(param1);
         this.camera = new Camera(this.level);
         addChild(this.camera);
         setChildIndex(this.camera,0);
         this.spotlight = new Spotlight();
         addChild(this.spotlight);
         this.timerHUD = new TimerHUD();
         if(!Constants.IS_VERSION_A && LevelsInfo.currLevel > LevelsInfo.numOfTutorialLevels)
         {
            addChild(this.timerHUD);
         }
         if(this.editorMode)
         {
            this.levelEditor.loadLevel(this.level);
         }
         Main.MainStage.focus = this.camera;
         this.cameraController = new CameraController(this.camera,null);
         if(Constants.DEBUG_DRAW)
         {
            this.physDebug = new PhysDebugLayer();
            this.level.addChild(this.physDebug);
         }
      }
      
      public function toggleLevelEditor() : void
      {
         this.editorMode = !this.editorMode;
         if(this.editorMode)
         {
            this.levelEditor.turnEditorOn();
         }
         else
         {
            this.levelEditor.turnEditorOff();
            this.level.frameCount = 0;
         }
         this.reloadLevel(this.level.recipe);
      }
      
      private function levelEditorListener(param1:KeyboardEvent) : void
      {
         var _loc2_:Vector2i = null;
         if(param1.keyCode == Keyboard.ENTER && Constants.LEVEL_EDITOR_ENABLED)
         {
            this.toggleLevelEditor();
         }
         if(this.editorMode)
         {
            if(param1.keyCode == Keyboard.O)
            {
               LevelIO.loadLevel(this.reloadLevel);
            }
            else if(param1.keyCode == Keyboard.P)
            {
               LevelIO.saveLevel(this.level.recipe);
            }
         }
         else if(param1.keyCode == Keyboard.R)
         {
            _loc2_ = this.level.player.getCenter();
            Main.log.logDeath(Utils.realToCell(_loc2_.x),Utils.realToCell(_loc2_.y),Constants.DEATH_BY_RESTART,this.level.frameCount);
            Main.log.logEndLevel();
            this.restartLevel();
         }
      }
      
      private function keyboardActionListener(param1:KeyboardEvent) : void
      {
         if((param1.keyCode == Keyboard.ESCAPE || param1.keyCode == Keyboard.P) && !this.editorMode)
         {
            if(this.isPaused)
            {
               this.pauseMenu.removeAllEventListeners();
               Utils.removeAllChildren(this.pauseMenu);
               removeChild(this.pauseMenu);
               Main.MainStage.focus = this.camera;
            }
            else
            {
               this.pauseMenu = new PauseMenu(this);
               addChild(this.pauseMenu);
            }
            this.isPaused = !this.isPaused;
         }
      }
      
      private function killPlayerIfOffMap(param1:Level) : void
      {
         var _loc2_:BriefClip = null;
         if(param1.player.y > param1.worldHeight + Constants.FALL_TO_DEATH_HEIGHT)
         {
            _loc2_ = new BriefClip(new Vector2(param1.player.x,param1.player.y),new Embedded.FireTileSWF() as MovieClip,new Vector2(),Constants.FADE_TIME,true,Constants.DEATH_CLIP_TYPE_FIRE);
            param1.player.kill(param1,_loc2_,Constants.DEATH_BY_FALLING);
         }
      }
      
      private function restartLevel() : void
      {
         this.editorMode = false;
         this.reloadLevel(this.level.recipe);
      }
      
      private function centerOnPlayer(param1:Number) : void
      {
         var _loc4_:Point = null;
         var _loc2_:Vector2 = new Vector2(this.level.player.x,this.level.player.y);
         var _loc3_:Number = 1;
         this.cameraController.update(_loc2_,this.level,new Point(0,0),new Point(this.level.cellWidth * Constants.CELL,this.level.cellHeight * Constants.CELL),param1,_loc3_);
         if(this.level.smooshedPlayer == null)
         {
            _loc4_ = new Point(this.level.player.getCenter().x,this.level.player.getCenter().y);
         }
         else
         {
            _loc4_ = new Point(this.level.smooshedPlayer.x,this.level.smooshedPlayer.y);
         }
         (_loc4_ = this.level.localToGlobal(_loc4_)).y = Math.min(_loc4_.y,Constants.HEIGHT);
         this.spotlight.x = _loc4_.x;
         this.spotlight.y = _loc4_.y;
      }
      
      private function handlePhysics() : void
      {
         var island:ViewPIsland = null;
         var rect:ViewPRect = null;
         var rects:* = undefined;
         var exit:Exit = null;
         ViewPIsland.updatePhysics(this.level.islands,this.level.columns,Constants.GRAVITY_VECTOR);
         for each(island in this.level.islandViews)
         {
            island.onUpdate();
         }
         for each(rect in this.level.rectViews)
         {
            if(rect.sprite is Exit)
            {
               exit = rect.sprite as Exit;
               if(exit.isHole)
               {
                  continue;
               }
            }
            rect.onUpdate(this.level.islands,rect.sprite.resolveCollision,rect.sprite.collisionCallback);
         }
         rects = this.level.rectViews.map(function(param1:ViewPRect, param2:int, param3:Array):*
         {
            return param1.phys;
         });
         if(Constants.DEBUG_DRAW)
         {
            this.physDebug.draw(this.level.islands,rects);
         }
      }
      
      private function processMovingTilesInGrid() : void
      {
         var islandView:ViewPIsland = null;
         var entity:TileEntity = null;
         var cell:Vector2i = null;
         var cellY:int = 0;
         var cellX:int = 0;
         for each(islandView in this.level.islandViews)
         {
            if(islandView.sprite.isMoving() && this.level.movingTiles.indexOf(islandView) == -1)
            {
               for each(entity in islandView.sprite.entityList)
               {
                  for each(cell in entity.cells)
                  {
                     cellY = cell.y + Math.round(entity.getGlobalAnchor().y);
                     cellX = cell.x + Math.round(entity.getGlobalAnchor().x);
                     this.level.tileEntityGrid[cellY][cellX] = null;
                  }
               }
               this.level.movingTiles.push(islandView);
            }
         }
         this.level.movingTiles = this.level.movingTiles.filter(function(param1:*):*
         {
            var _loc2_:* = undefined;
            var _loc3_:* = undefined;
            var _loc4_:* = undefined;
            var _loc5_:* = undefined;
            if(!param1.sprite.isMoving())
            {
               for each(_loc2_ in param1.sprite.entityList)
               {
                  for each(_loc3_ in _loc2_.cells)
                  {
                     _loc4_ = _loc3_.y + Math.round(_loc2_.getGlobalAnchor().y);
                     _loc5_ = _loc3_.x + Math.round(_loc2_.getGlobalAnchor().x);
                     level.tileEntityGrid[_loc4_][_loc5_] = _loc2_;
                  }
               }
               return false;
            }
            return true;
         });
      }
      
      private function resolveFreeEntityCollisions() : void
      {
         var _loc2_:int = 0;
         var _loc1_:int = 0;
         while(_loc1_ < this.level.enemies.length)
         {
            _loc2_ = _loc1_ + 1;
            while(_loc2_ < this.level.enemies.length)
            {
               if(this.level.enemies[_loc1_].isTouching(this.level.enemies[_loc2_]))
               {
                  this.level.enemies[_loc1_].mutualIgnite(this.level,this.level.enemies[_loc2_]);
               }
               _loc2_++;
            }
            if(this.level.player.isTouching(this.level.enemies[_loc1_]))
            {
               if(this.level.enemies[_loc1_] is Exit)
               {
                  if(this.level.enemies[_loc1_].canExit())
                  {
                     this.playerWon = true;
                  }
               }
               else
               {
                  this.level.player.mutualIgnite(this.level,this.level.enemies[_loc1_]);
                  this.level.player.damageFromEnemyContact(this.level);
               }
            }
            _loc1_++;
         }
      }
      
      private function executeClipsAndDelayedFunctions() : void
      {
         var o:Object = null;
         var func:Function = null;
         var framesLeft:int = 0;
         this.level.briefClips.filter(function(param1:Object):Boolean
         {
            var _loc2_:BriefClip = param1 as BriefClip;
            if(_loc2_.clip is Embedded.FireballFizzSWF)
            {
               Utils.moveInDirFacing(_loc2_,Constants.FBALL_SPEED / 2);
            }
            return !_loc2_.update();
         });
         var newDelayedFunctions:Dictionary = new Dictionary();
         for(o in this.level.delayedFunctions)
         {
            func = o as Function;
            framesLeft = this.level.delayedFunctions[func];
            if(framesLeft <= 0)
            {
               func();
            }
            else
            {
               newDelayedFunctions[func] = framesLeft - 1;
            }
         }
         this.level.delayedFunctions = newDelayedFunctions;
      }
      
      private function checkTalisman() : void
      {
         var _loc1_:Vector2 = null;
         if(this.level.talisman == null || LevelsInfo.tutorialTalisman[LevelsInfo.currLevel] == null)
         {
            return;
         }
         if(this.level.player.hitTestObject(this.level.talisman))
         {
            _loc1_ = new Vector2(this.level.talisman.x,this.level.talisman.y);
            this.level.addBriefClip(Embedded.TalismanObtain,_loc1_);
            this.level.addBriefClip(Embedded.FireTileSWF,_loc1_);
            this.level.removeChild(this.level.talisman);
            this.level.talisman = null;
            this.level.player.fireDisabled = false;
            this.level.addMessage("Press the right arrow key to shoot right",300,500);
         }
      }
      
      private function update(param1:Event) : void
      {
         var _loc2_:FreeEntity = null;
         this.benchmarker.endPhase();
         this.benchmarker.endFrame();
         this.benchmarker.beginFrame();
         this.spotlight.visible = false;
         if(this.editorMode || this.isPaused)
         {
            return;
         }
         this.checkTalisman();
         this.spotlight.visible = true;
         this.level.frameCount += 1;
         this.timerHUD.time = this.level.frameCount;
         this.centerOnPlayer(Constants.DT);
         this.spotlight.step();
         if(this.level.gameOverState == Constants.GAME_OVER_FADING)
         {
            this.spotlight.shrink = true;
            this.executeClipsAndDelayedFunctions();
            if(this.level.gameOverState == Constants.GAME_OVER_COMPLETE)
            {
               this.restartLevel();
            }
            return;
         }
         this.level.dirty = false;
         this.level.player.update(this.level);
         for each(_loc2_ in this.level.enemies)
         {
            _loc2_.update(this.level);
         }
         this.level.projectileUpdate();
         this.benchmarker.beginPhase("FIRE");
         FireHandler.spreadFire(this.level);
         this.benchmarker.endPhase();
         this.benchmarker.beginPhase("PHYSICS");
         this.handlePhysics();
         this.benchmarker.endPhase();
         this.resolveFreeEntityCollisions();
         this.processMovingTilesInGrid();
         this.killPlayerIfOffMap(this.level);
         this.executeClipsAndDelayedFunctions();
         this.benchmarker.beginPhase("REMOVE DEAD");
         this.level.removeDead();
         this.benchmarker.endPhase();
         SoundManager.endFrame();
         Filmstrip.update();
         if(this.playerWon)
         {
            this.levelJustWon = true;
            StateController.doOnLevelComplete(this.level.frameCount);
         }
         this.benchmarker.beginPhase("BETWEEN UPDATES");
      }
      
      private function addSkipButton() : void
      {
         addChild(CoreButton.createDefaultSize(function():void
         {
            StateController.doOnLevelComplete(level.frameCount);
         },"Skip Level"));
      }
   }
}
