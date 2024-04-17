class DateFormat {
  private localeString: string;
  constructor() {
    this.localeString = 'en-GB';
  }

  addMonth(date: any, month: number, format: boolean = true) {
    if(typeof date === 'string') {
    const array = date.split('/');
    const newDate = new Date(+array[2],+array[1],+array[0]);
    if(!format) return new Date(newDate.setMonth(newDate.getMonth()+month));
    else return this.formatDate(new Date(newDate.setMonth(newDate.getMonth()+month)));
    }

    return new Date(date.setMonth(date.getMonth()+month));
  }

  minusMonth(date: Date, month: number) {
    new Date(date.setMonth(date.getMonth()-month));
  }

  formatDate(date: Date) {
    return date.toLocaleDateString(this.localeString);
  }

  getDate(date: string) {
    const array = date.split('/');
    return new Date(+array[2],+array[1],+array[0]);
  }

  set setLocale(code: string) {
    this.localeString = 'string';
  }

  get getLocale() {
    return this.localeString;
  }
}

const i = new DateFormat();
export {i as DateFormat }
