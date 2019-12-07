# Space Invaders

The classic Space Invaders game written in JavaScript as a learning exercise.

No jQuery or any other third party libraries, just raw JavaScript, CSS and HTML.

See it Live: [https://dwmkerr.github.io/spaceinvaders/](https://dwmkerr.github.io/spaceinvaders/)

[![Space Invaders Screenshot](./screenshot.jpg "Space Invaders Screenshot")](https://dwmkerr.github.io/spaceinvaders/)

## Intro

What's there to say? It's Space Invaders in JavaScript!

Create the game, give it a `div` to draw to, tell it when the keyboard is mashed and that's all you need to add Space Invaders to a website.

This is a simple learning exercise, so the JavaScript is deliberate kept all one file. There's no linting, testing, CI, or anything like that. If you want to see such patterns in front-end JavaScript, check out something like [angular-modal-service](https://github.com/dwmkerr/angular-modal-service).

## Adding Space Invaders to a Web Page

First, drop the `spaceinvaders.js` file into the website.

Now add a canvas to the page.

```html
<canvas id="gameCanvas"></canvas>
```

Next, add the Space Invaders game code. You create the game, initialise it with the canvas, start it and make sure you tell it when a key is pressed or released. That's it!

```html
<script>
//  Setup the canvas.
var canvas = document.getElementById("gameCanvas");
canvas.width = 800;
canvas.height = 600;

//  Create the game.
var game = new Game();

//  Initialise it with the game canvas.
game.initialise(canvas);

//  Start the game.
game.start();

//  Listen for keyboard events.
var pressedKeys = [];
window.addEventListener("keydown", function keydown(e) {
  var keycode = window.event.keycode || e.which;
    if(!pressedKeys[keycode])
      pressedKeys[keycode] = true;
    //  Supress further processing of left/right/space (37/29/32)
    if(keycode == 37 || keycode == 39 || keycode == 32) {
      e.preventDefault();
    }
    game.keyDown(keycode);
});
window.addEventListener("keyup", function keydown(e) {
  var keycode = window.event.keycode || e.which;
    if(pressedKeys[keycode])
      delete pressedKeys[keycode];
    game.keyUp(keycode);
});
</script>
```

## References

Other bits and pieces that are useful can be dropped here.

- The sounds came from [http://www.classicgaming.cc/classics/spaceinvaders/sounds.php](http://www.classicgaming.cc/classics/spaceinvaders/sounds.php)

## Publishing

On changes to the `master` branch, the GitHub Pages site will be automatically updated.


## Hackathon Lunes

O sistema de Blockchain Lunes vai ficar responsável por gerir a contagem de pontos dos jogadores. Os jogadores serão todos identificados pelo seu endereço na rede Lunes (o seu Address). O Address Lunes é uma string contendo um Hash de identificação do usuário do Blockchain.

A interação com o Blockchain é feita a partir de chamadas à API da rede Lunes. Neste desafio de Hackathon, a chamada vai ser intemediada pelas funções `getPlayerScore`, `getListBoard` e `LunesTransferGame`.

`getPlayerScore` retorna o Score do jogador como um número inteiro. `getListBoard` retorna um objeto JSON contendo um array de jogadores e seus Scores. O objeto JSON que grava cada jogador e seu score segue o padrão abaixo
 
 ```
listboard = {
    list : [
        { 
            player_address : "string",
            score : integer
        }
    ]
}
``` 
 
 `LunesTransferGame` é a função que tranfere o score resultante do jogo para o jogador.
 
 # O Desafio do Hackathon
 
 Para o desafio deste Hackathon, pede às equipes participantes que organizem uma modificação deste jogo para que ele satisfaça os seguintes tópicos:
 
1. Na tela de entrada, dada no `WelcomeState`, o jogador insira seu Address Lunes.
2. Na tela de término da partida, dada no `GameOverState`, o jogador receba seus pontos no Score e mostre uma lista com os melhores jogadores registrados no Blockchain.

Além disto, a equipe deverá compatibilizar em sua solução o uso dos elementos gráficos da Lunes disponibilizados na pasta `/js/res`.

### Bom divertimento. HACK THE WORLD!!!