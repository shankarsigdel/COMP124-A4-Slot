/* 
*************************************************
Name        : Shankar Sigdel
Student ID  : 301110925
Program     : Slot Machine.ts
Course      : COMP125-M2020-Assignment4
Professor   : Tom Tsiliopoulos 
*************************************************
*/
(function(){
    // Function scoped Variables
    let stage: createjs.Stage;
    let assets: createjs.LoadQueue;
    let slotMachineBackground: Core.GameObject;
    //About the buttons
    let spinButton: UIObjects.Button;
    let bet1Button: UIObjects.Button;
    let betMaxButton: UIObjects.Button;
    let rePayToPlayButton: UIObjects.Button;
    let stopOrResumeGameButton: UIObjects.Button;
    //About the Labels
    let jackPotLabel: UIObjects.Label;
    let creditLabel: UIObjects.Label;
    let winningsLabel: UIObjects.Label;
    let betLabel: UIObjects.Label;
    //Game Objects
    let leftReel: Core.GameObject;
    let middleReel: Core.GameObject;
    let rightReel: Core.GameObject;
    let betLine: Core.GameObject;
    //Jackpot player and money with credits and winnings
    let playerMoney: number = 1000;
    let winnings: number = 0;
    let jackpot: number = 0;
    let playerBet: number = 0;
    //Id and Source for images
    let manifest: Core.Item[] = [
        {id: "background", src: "./Assets/images/background.png"},
        {id: "banana", src: "./Assets/images/banana.gif"},
        {id: "bar", src: "./Assets/images/bar.gif"},
        {id: "bell", src: "./Assets/images/bell.gif"},
        {id: "bet_line", src: "./Assets/images/bet_line.gif"},
        {id: "bet1Button", src: "./Assets/images/bet1Button.png"},
        {id: "betMaxButton", src: "./Assets/images/betMaxButton.png"},
        {id: "blank", src: "./Assets/images/blank.gif"},
        {id: "cherry", src: "./Assets/images/cherry.gif"},
        {id: "grapes", src: "./Assets/images/grapes.gif"},
        {id: "orange", src: "./Assets/images/orange.gif"},
        {id: "seven", src: "./Assets/images/seven.gif"},
        {id: "spinButton", src: "./Assets/images/spinButton.png"},
        {id: "rePayToPlayButton", src: "./Assets/images/rePayToPlayButton.png"},
        {id: "stopOrResumeGameButton", src: "./Assets/images/stopOrResumeGameButton.png"}
    ];

    // This function triggers first and 'Preloads' all the assets
    function Preload()
    {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on('complete', Start);

        assets.loadManifest(manifest);
    }

    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start():void
    {
        console.log("App Started . . .");
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667ms
        createjs.Ticker.on('tick', Update);

        stage.enableMouseOver(20);

        Config.Globals.AssetManifest = assets;
        
        Main();
    }
    // called every frame
    function Update():void
    {
        stage.update();
    }
    // create an array of symbols and return the probability array
    function createProbability(): string[]
    {
        let blanks = 
        Array<string>(27).fill('blank');
        let grapes = 
        Array<string>(10).fill('grapes');
        let bananas = 
        Array<string>(9).fill('banana');
        let oranges = 
        Array<string>(8).fill('orange');
        let cherries = 
        Array<string>(5).fill('cherry');
        let bars = 
        Array<string>(3).fill('bar');
        let bells = 
        Array<string>(2).fill('bell');
        let probabilities: string[] = [].concat(blanks, grapes, bananas, oranges, cherries, bars, bells, 'seven');
        return probabilities;
    }
    // This Function return a reels array
    function spinReels(probabilityArray: string[]): string[]
    {
        let reels: string[] = ["", "", ""];
        for (let index = 0; index < 3; index++) 
        {
            reels[index] = probabilityArray[Math.floor(Math.random() * 64 + 1)];
        }
        checkWinning(reels);
        
        return reels;
    }
    //To check the winnings
    function checkWinning(reels: string[])
    {
        winnings = 0;

        let duplicateNum: 
        number = 0;
        let duplicatedSymbol: 
        string = "";
        let multiplicitationNumber: 
        number = 0;
        
    // compare symbols in the reels
        if(reels[0] === reels[1])
        {
            duplicateNum++;
            duplicatedSymbol = reels[0];
        }
        if(reels[0] === reels[2])
        {
            duplicateNum++;
            duplicatedSymbol = reels[0];
        }
        if(reels[1] === reels[2] && duplicateNum <= 1)
        {
            duplicateNum++;
            duplicatedSymbol = reels[1];
        }

        // if there is a blank, winnings is Zero
        if(reels.indexOf('blank') > -1)
        {
            winnings = 0;
            console.log("You Loose !") //Loose
        }
        else
        {
        // IF there is not blank and duplicate number is greater than or equals to two... symbols
            if(duplicateNum >= 2)
            {
                switch (duplicatedSymbol) 
                {
                    case 'grapes': multiplicitationNumber = 10;
                        break;
                    case 'banana': multiplicitationNumber = 20;
                        break;
                    case 'orange': multiplicitationNumber = 30;
                        break;
                    case 'cherry': multiplicitationNumber = 40;
                        break;
                    case 'bar': multiplicitationNumber = 50;
                        break;
                    case 'bell': multiplicitationNumber = 75;
                        break;
                    case 'seven': multiplicitationNumber = 100;
                        break;
                    default:  multiplicitationNumber = 1;
                        break;
                }
            }
        // If the two symbols are the same then, ...
            else if(duplicateNum === 1)
            {
                switch (duplicatedSymbol) 
                {
                    case 'grapes': multiplicitationNumber = 2;
                        break;
                    case 'banana': multiplicitationNumber = 3;
                        break;
                    case 'orange': multiplicitationNumber = 4;
                        break;
                    case 'cherry': multiplicitationNumber = 5;
                        break;
                    case 'bar': multiplicitationNumber = 7;
                        break;
                    case 'bell': multiplicitationNumber = 9;
                        break;
                    case 'seven': multiplicitationNumber = 29;
                        break;
                    default: multiplicitationNumber = 1;
                        break;
                }
            // if there are two same symbols and 1 seven
                if(reels.indexOf('seven') > -1 && duplicatedSymbol !== 'seven')
                {
                    winnings = playerBet * 5;
                }
            }
            else 
            {
            // If there is one seven with different symbol
                if(reels.indexOf('seven') > -1)
                {
                    winnings = playerBet * 5;
                }
            // otherwise it displays different symbols without blanks
                else
                {
                    winnings = playerBet;
                    console.log("You Win!") // win information
                }
                
            }
        }
        winnings += playerBet * multiplicitationNumber;

        playerMoney += winnings;

        creditLabel.setText(playerMoney.toString());

        // Special message for the player wins the jackpot
        if(winnings === jackpot)
        {
            winningsLabel.setText("JP" + winnings.toString());
        }
        else
        {
            winningsLabel.setText(winnings.toString());            
        }
    }
    //Button Enable and disable function according to player's money and bet
    function buttonCheck()
    {
        enableButton(true);

        if(playerMoney < 1)
        {
            bet1Button.greyButton(true);
            spinButton.greyButton(true);
            betMaxButton.greyButton(true);
            rePayToPlayButton.greyButton(false);
        }
    }
    // this function is to enable the button
    function enableButton(isEnabled: boolean)
    {
        bet1Button.greyButton(!isEnabled);
        betMaxButton.greyButton(!isEnabled);
        spinButton.greyButton(!isEnabled);
        rePayToPlayButton.greyButton(true);
    }
    //Function to stop the Game
    function stopGame()
    {
        enableButton(false);
        leftReel.image = 
        assets.getResult('blank') as HTMLImageElement;
        middleReel.image = 
        assets.getResult('blank') as HTMLImageElement;
        rightReel.image = 
        assets.getResult('blank') as HTMLImageElement;
    }
    //Function to resume the game
    function resumeGame()
    {
        enableButton(true);
        spinButton.greyButton(true);
        if(playerMoney <= 0 && playerBet <= 0)
        {
            rePayToPlayButton.greyButton(false);
            alert("You ran out of money...! Please press ok and $ Button to add the amount.")
            console.log("you ran out of Money...")
        }
    }
    // Function is to be the money
    function betMoney(betAmount: number): void
    {
        if(playerMoney >= betAmount)
        {
            // calculate player's current money, betting money, jackpot money
            playerMoney -= betAmount;
            playerBet += betAmount;
            jackpot += betAmount * 100;

            betLabel.setText(playerBet.toString());
            creditLabel.setText(playerMoney.toString());
            jackPotLabel.setText(jackpot.toString());
            
            // when the player bet money, spin button is enabled
            spinButton.greyButton(false);
            
        }
    }
    //This function is to build the whole intergface of the interace of the Slot machine
    function buildInterface(): void
    {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true );
        stage.addChild(slotMachineBackground);

        // Buttons
        //Spin Button SetUp
        spinButton = new UIObjects.Button('spinButton', Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        //Bet 1 Button SetUp
        bet1Button = new UIObjects.Button('bet1Button', Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        //Bet Maximum  Button SetUp
        betMaxButton = new UIObjects.Button('betMaxButton', Config.Screen.CENTER_X + 68, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);
        //Stop or resume the game Button SetUp
        stopOrResumeGameButton = new UIObjects.Button('stopOrResumeGameButton', Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(stopOrResumeGameButton);
        //Repay to play the game Button SetUp
        rePayToPlayButton = new UIObjects.Button('rePayToPlayButton', Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(rePayToPlayButton);

        // Labels
        //Jackpot labels setUp
        jackPotLabel = new UIObjects.Label(jackpot.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        //Credit labels setUp
        creditLabel = new UIObjects.Label(playerMoney.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X - 95, Config.Screen.CENTER_Y + 107, true);
        stage.addChild(creditLabel);
        //Winnings labels setUp
        winningsLabel = new UIObjects.Label(winnings.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 107, true);
        stage.addChild(winningsLabel);
        //Bet labels setUp
        betLabel = new UIObjects.Label(playerBet.toString(), '20px', 'Consolas', '#FF0000', Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 107, true);
        stage.addChild(betLabel);

        // Reel GameObjects
        //Left Reel setUp
        leftReel = new Core.GameObject('bell', Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        //Center Reel setUp
        middleReel = new Core.GameObject('bar', Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        //Right Sided Reel setUp
        rightReel = new Core.GameObject('banana', Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);

        // Bet Line
        betLine = new Core.GameObject('bet_line', Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 14, true);
        stage.addChild(betLine);
    }

    function interfaceLogic(): void
    {
        let isGameStopped = false;
        //Stop or resume button
        stopOrResumeGameButton.on('click', () => 
        {
            isGameStopped = !isGameStopped;

            if(isGameStopped)
            {
                stopGame();
            }
            else
            {
                resumeGame();
            }
            console.log("Stop or Resume Button Clicked...");
        })

        rePayToPlayButton.on('click', () => 
        {
            // Re-play button ... if the player runs out of money
            if(playerMoney <= 0 && playerBet <= 0)
            {
                playerMoney = 1000;
                creditLabel.setText(playerMoney.toString());
                enableButton(true);
                console.log("Credit added ... You Can bet now!");
            }
        });
        
        // if the user bet money, spin button is enabled
        bet1Button.on('click', () => {
            betMoney(1);
            console.log("Bet 1 Button Clicked...");
        });
        betMaxButton.on('click', () => {
            betMoney(playerMoney);
            console.log("Bet Max Button Clicked...");
        });

        // by default, spin button and replenish button are disabled
        spinButton.greyButton(true);

        rePayToPlayButton.greyButton(true);

        spinButton.on('click', () => 
        {
            if(playerBet > 0)
            {
                let probability: string[] = createProbability();

                // reel test
                let reels: string[] = spinReels(probability);

                // replace the images in the reels
                leftReel.image = 
                assets.getResult(reels[0]) as HTMLImageElement;
                middleReel.image = 
                assets.getResult(reels[1]) as HTMLImageElement;
                rightReel.image = 
                assets.getResult(reels[2]) as HTMLImageElement;
                
                playerBet = 0;
                betLabel.setText(playerBet.toString());
                jackpot = 0;
                jackPotLabel.setText(jackpot.toString());

                buttonCheck();

                spinButton.greyButton(true);
                console.log("Spin Button Clicked...");
            }
        });

    }

    // app logic goes here
    function Main(): void
    {
        buildInterface();
        interfaceLogic();
    }

    window.addEventListener("load", Preload);
}());
