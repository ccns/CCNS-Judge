CREATE TABLE problems (
  qid             text PRIMARY KEY,
  name            text,
  description     text,
  example_input   text,
  example_output  text,
  hint            text,
  input           text,
  output          text,
  timeout         integer DEFAULT 1000,
  submission      integer DEFAULT 0,
  accepted        integer DEFAULT 0,
  CHECK (submission >= accepted)
);
