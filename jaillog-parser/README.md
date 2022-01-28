# Jaillog Parser

A second, more robust attempt at making a simple parser for parsing inmate rosters as they arrive in HTML form from the Tom Green County Sheriff's Office.

## Scope

In my previous attempt, the parser was mixed in with the logic for deconstructing the HTML document to get the data I needed. This time, I'll write completely separate logic for all of the necessary components. Therefore, this specific package will _only_ be responsible for parsing a list of charges as they're written in the original email and returning (possibly) some kind of AST (if that's not overkill).

## Domain Knowledge

A charge listing from the morning arrest records looks like this:

```
41999999 PUBLIC INTOXICATION
```

It usually consists of an 8-digit, non-unique, numeric code, followed by text describing the charge. The above `PUBLIC INTOXICATION` charge is simple enough, and could probably be assembled into a more attractive format easily enough. But, of course, they don't all look like that.

Here's one with some more information:

```
35990015 *J/I*POSS CS PG 1 >=1G<4G
```

I'm not actually sure what `J/I` means, but I do know similar charge modifiers appear before a number of other charges. `*GJI*` means `Grand Jury Indictment`. There are a few others I need  to collect some information on, but I can create a `ChargeModifier` token type and work with that. It won't be too difficult because the modifiers are _usually_ surrounded by asterisks, although sometimes whoever enters the arrest records makes a typo and leaves off one of the asterisks, so I'll have to make sure that any set of characters preceeded by or followed by an asterisk can be tokenized.

Other portions of the charge above carry their own significance as well. I know `POSS` means `possession`, `CS` means `controlled substance`. I'm not sure what `PG 1` means. I suspect it means `punishment group`.

`>=` is obvious, as is `<`, so we know `>=1G<4G` is `greater than or equal to 1 gram, less than 4 grams`