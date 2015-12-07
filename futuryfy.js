var fy = (futuryfy = {
    app: 'futuryfy',
    author: 'sam vieten',
    detection : {
        soft: function(modal) {
            var result =     this.support.webgl();
            !result && modal ? this.modal() : false;
            return result;
        },
        modern: function(modal) {
            var result =    this.support.webgl() &&
                            this.support.htmlTemplate();
            !result && modal ? this.modal() : false;
            return result;
        },
        advanced: function(modal) {
            var result =    this.support.webgl() &&
                            this.support.htmlTemplate() &&
                            this.support.customElements();
            !result && modal ? this.modal() : false;
            return result;
        },
        extreme: function(modal) {
            var result =    this.support.webgl() &&
                            this.support.htmlTemplate() &&
                            this.support.customElements() &&
                            this.support.animationFrame() &&
                            this.support.htmlImport();
            !result && modal ? this.modal() : false;
            return result;
        },
        modal: function(message, styles) {
            message ? false : message = 'Your browser seems to be outdated. Please upgrade to a more modern browser ~ futuryfy.js'
            var modal = document.createElement('div'),
                modalClose = document.createElement('button');
            modal.style.display = 'block';
            modal.style.position = 'absolute';
            modal.style.top = '0';
            modal.style.width = '100%';
            modal.style.boxSizing = 'border-box';
            modal.style.height = 'auto';
            modal.style.padding = '10px';
            modal.style.backgroundColor = '#c00';
            modal.style.color = '#fff';
            modal.style.fontFamily = '"Helvetica", sans-serif';
            modal.className = 'fy-modal';
            modalClose.style.float = 'right';
            modalClose.innerHTML = 'x';
            modal.innerHTML = message;
            modal.appendChild(modalClose);
            modalClose.addEventListener('click', function(e){
                modal.remove();
            });
            document.body.appendChild(modal);
        },
        //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
        support: {
            webgl: function(return_context) {
                if (!!window.WebGLRenderingContext) {
                    var canvas = document.createElement("canvas"),
                         names = ["webgl", "experimental-webgl","moz-webgl", "webkit-3d"],
                         context = false;
                    for(var i=0;i<4;i++) {
                        try {
                            context = canvas.getContext(names[i]);
                            if (context && typeof context.getParameter == "function") {
                                if (return_context) {
                                    return {name:names[i], gl:context};
                                }
                                return true;
                            }
                        } catch(e) {}
                    }
                    return false;
                }
                return false;
            },
            htmlTemplate: function() {
                return 'content' in document.createElement('template');
            },
            customElements: function() {
                return 'registerElement' in document;
            },
            shadowDOM: function() {
                return document.head.createShadowRoot;
            },
            htmlImport: function() {
                return 'import' in document.createElement('link');
            },
            animationFrame: function() {
                return window.requestAnimationFrame;
            }
        }
    }
});
fy.detection.advanced('true')
/*
fy.detection.soft()
fy.detection.modern()
fy.detection.advanced()
fy.detection.extreme()
fy.detection.support.webgl()
fy.detection.support.htmlTemplate()
fy.detection.support.customElements()
fy.detection.support.shadowDOM()
fy.detection.support.htmlImport()
fy.detection.support.animationFrame()

options: true / false @modal
*/
