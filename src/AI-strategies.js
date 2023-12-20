export var getAIStrategy = function (name) {
  const strategies = {
    "Fly Straight": {
      use(object) {
        object.body.velocity.y = object.speed;
      },
    },
    "Fly Diagonal": {
      use(object) {
        object.body.velocity.y = object.speed;

        if (object.body.x < 320) {
          object.body.velocity.x = 20;
        } else {
          object.body.velocity.x -= 20;
        }
      },
    },
  };

  return strategies[name];
};
