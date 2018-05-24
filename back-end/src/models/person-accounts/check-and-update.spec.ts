import {checkAndUpdate as mdl} from './check-and-update';
import { PersonAccountsModel } from './person-accounts.model';

describe('person-accounts check-and-update', () => {
  beforeAll(() => {
    spyOn(PersonAccountsModel, 'create');
    spyOn(PersonAccountsModel, 'findOne');
  });

  it('should delete id field if it null', () => {
    const param: any = {
      id: null,
      test: true
    };

    mdl(param);

    expect(param).toEqual({test: true});
  });

  it('should create person account if no item found by person', () => {
    // arrange
    const param: any = {
      person: 'person_id'
    };
    (PersonAccountsModel.findOne as any).and.returnValue(new Promise((res) => {
      return res(null);
    }));
    // act
    const req = mdl(param);
    // assert
    req.then(() => {
      expect(PersonAccountsModel.create).toHaveBeenCalled();
    });
  });
});
