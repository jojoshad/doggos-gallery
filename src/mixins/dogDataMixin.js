export default {
  methods: {
    getDogData(breed) {
      return { name: breed, img: this.getPicture(breed) };
    },
    getDogPicture(picture) {
      return { img: picture };
    }
  }
};
