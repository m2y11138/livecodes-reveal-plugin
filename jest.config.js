module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/__test__/**/*.ts?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  modulePathIgnorePatterns: ["/build/"],
};
