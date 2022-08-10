import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string): any {
    if(!value || filterString=="" || propName ==""){
      return value
    }
    else{
      let filteredRes = value.filter(function(v){
        return v[propName].trim().toLowerCase().includes(filterString.toLowerCase())
      })
      console.log(filteredRes);
      return filteredRes;
    }
  }

}
