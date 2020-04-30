class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.by === "tour-name") {
      this.query = this.query.find({
        name: { $regex: this.queryString.search, $options: "i" },
      });
      return this;
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate() {
    if (this.queryString.page) {
      const { page } = this.queryString;
      this.query.limit(8).skip((page - 1) * 8);
      return this;
    }
    this.query.limit(8);

    return this;
  }
}

module.exports = APIFeatures;
