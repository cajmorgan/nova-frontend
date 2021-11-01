class Router {
  #path
  #componentArray

  constructor(path, componentArray) {
    this.#path = path;
    this.#componentArray = componentArray;
  }
}


//Dispatch event, locationchange. Add event listener on locationchange in router. On declaration, invoke same function than put that in event listener 