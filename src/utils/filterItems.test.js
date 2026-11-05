import { filterItems } from './filterItems';

const items = [
  {
    name: 'Blue Backpack',
    description: 'Canvas bag with a laptop sleeve',
    location: 'Student Center',
    status: 'found'
  },
  {
    name: 'Car Keys',
    description: 'Honda key with red keychain',
    location: 'Parking Lot B',
    status: 'lost'
  }
];

describe('filterItems', () => {
  it('returns all items when no filters are selected', () => {
    expect(filterItems(items, 'all', '')).toEqual(items);
  });

  it('filters by status and searches item details case-insensitively', () => {
    expect(filterItems(items, 'lost', 'HONDA')).toEqual([items[1]]);
    expect(filterItems(items, 'all', 'student center')).toEqual([items[0]]);
  });

  it('ignores surrounding whitespace and returns no unrelated matches', () => {
    expect(filterItems(items, 'all', '  laptop  ')).toEqual([items[0]]);
    expect(filterItems(items, 'found', 'keys')).toEqual([]);
  });
});
