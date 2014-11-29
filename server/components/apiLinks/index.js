'use strict';

module.exports = {
  game: function(game) {
    var endpoint = '/api/games',
      self = endpoint + '/' + game._id,
      tags = self + '/tags';

    return {
      self: self,
      tags: tags
    };
  },
  tag: function(tag) {
    var endpoint = '/api/tags',
      self = endpoint + '/' + tag._id,
      canonical = endpoint + '/' + tag.canonical,
      obj = {
        self: self
      };

    if (tag.canonical) {
      obj.canonical = canonical;
    }

    return obj;
  },
  review: function(review) {
    var endpoint = '/api/reviews',
      self = endpoint + '/' + review._id,
      author = self + '/author',
      game = self + '/game';

    return {
      self: self,
      author: author,
      game: game
    };
  }
};
