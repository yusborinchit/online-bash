import { beforeEach, expect, test } from "vitest";
import { Bash } from "../../src/models/bash";

let bash = new Bash();

beforeEach(() => {
  bash = new Bash();
});

test("the bash should be able to create and delete directories", () => {
  const first_folder = crypto.randomUUID();
  const second_folder = crypto.randomUUID();

  bash.makeDirectory(first_folder);
  bash.makeDirectory(second_folder);

  expect(bash.listItems().map((item) => item.getName())).toStrictEqual([
    first_folder,
    second_folder,
  ]);

  bash.removeDirectory(first_folder);
  bash.removeDirectory(second_folder);

  expect(bash.listItems().map((item) => item.getName())).toStrictEqual([]);
});

test("the bash should be able to navigate into directories", () => {
  const first_folder = crypto.randomUUID();
  const second_folder = crypto.randomUUID();

  bash.makeDirectory(`${first_folder}/${second_folder}`);
  bash.changeDirectory(`${first_folder}/${second_folder}`);

  expect(bash.getCurrentPath()).toBe(`$/${first_folder}/${second_folder}`);

  bash.changeDirectory("..");
  bash.changeDirectory("..");

  expect(bash.getCurrentPath()).toBe("$");
});
