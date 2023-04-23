export default class Filter {
    filterByStatus(status, cards) {
     
      switch (status) {
        case "1":
          return this.#getOpenedCards(cards);
        case "2":
          return this.#getClosedCards(cards);
        default:
          return cards;
      }
    }
  
    #getClosedCards(cards) {
      let filteredArray = [];
      cards.forEach((card) => {
        if ((Date.now() - Date.parse(card.data)) > 0) {
          filteredArray.push(card);
        }
      });
      return filteredArray;
    }
  
    #getOpenedCards(cards) {
      let filteredArray = [];
      cards.forEach((card) => {
        if ((Date.now() - Date.parse(card.data)) <= 0) {
          filteredArray.push(card);
        }
      });
      return filteredArray;
    }
  
    filterByUrgency(urgency, cards) {
      let cardsFeiltered = [];
      cards.forEach((card) => {
        if (card.ugency === urgency) {
          cardsFeiltered.push(card);
        }
      });
      return cardsFeiltered;
    }
  
    filterByTitleAndBodyText(textSearch, cards) {
      if (textSearch === "" || textSearch === undefined) {
        return cards;
      }
      let cardsFiltered = [];
      cards.forEach((card) => {
        //деструктурирую карту и если не было заполнено одно из полей, ининциализирую его пустой сторокой, чтоб не ловить исключение.
        let { description, goal } = card;
        description = description === undefined ? "" : description;
        goal = goal === undefined ? "" : goal;
  
        if (description.includes(textSearch) || goal.includes(textSearch)) {
          cardsFiltered.push(card);
        }
      });
      
      return cardsFiltered;
    }
  
    filterByNameLastname(textSearch, cards){
      let cardsFiltered = [];
      cards.forEach((card) => {
        //деструктурирую карту и если не было заполнено одно из полей, ининциализирую его пустой сторокой, чтоб не ловить исключение.
        let { name, lastName } = card;
        name = name === undefined ? "" : name.toLowerCase();
        lastName = lastName === undefined ? "" : lastName.toLowerCase();
        textSearch = textSearch.toLowerCase();
        if (lastName.includes(textSearch) || name.includes(textSearch)) {
          cardsFiltered.push(card);
        }
      });
      return cardsFiltered;
    }
  
  }