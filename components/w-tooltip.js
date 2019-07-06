Slim.tag('w-tooltip', class extends Slim {
    get template() {
        return `
        <style bind>
        slim-content 
        {
            display: [[displayContent]];
            background-color: [[backgroundColor]];
            position: absolute;
            margin-bottom: 5px;
            padding: 7px;
            width: auto;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            color: #fff;
            text-align: center;
            font-size: 14px;
            line-height: 1.2;       
            float: left;     
        }
        slim-content:before{
            bottom: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;            
            border-color: rgba(194, 225, 245, 0);
            border-bottom-color: [[backgroundColor]];
            border-width: 10px;
            margin-left: -10px;         
        }
        </style>
        <slim-content style="top:[[topPos]]px;left:[[leftPos]]px"></slim-content>`;
    }
    onBeforeCreated() {
        this.displayContent = 'block';
        this.backgroundColor = 'hsla(0, 0%, 20%, 0.9)';
        this.leftPos = 0;
        this.topPos = 0;
    }

    onCreated() {

    }

    onAfterUpdate() {
        this.parentElement.addEventListener('mouseenter',()=>{              
            this.displayContent = 'block';
        });
        this.parentElement.addEventListener('mousemove',()=>{              
            this.displayContent = 'block';
            this.leftPos = event.clientX + document.body.scrollLeft;
            this.topPos = event.clientY + document.body.scrollTop;
        });
  
    }
});