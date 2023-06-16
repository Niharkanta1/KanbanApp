import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cast',
})
export class CastPipe implements PipeTransform {
  /**
   * Cast (S: SuperType) into (T: Type) using @Generics.
   * @param value S: SuperType obtained from input type.
   * @returns (T: Type) obtained by assignment type.
   */
  transform<S, T extends S>(value: S): T {
    return <T>value;
  }
}
