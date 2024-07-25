import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/Button';
import { useState } from 'react';

enum Operators {
  CLEAR = 'C',
  PLUS = '+',
  MINUS = '-',
  EQUAL = '=',
}

const App = () => {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState(
    [] as (number | Operators.PLUS | Operators.MINUS)[]
  );

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 5) / 4;

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if (value === Operators.PLUS || value === Operators.MINUS) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });

    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressNumber = (number: number) => {
    const last = formula[formula.length - 1];

    if (typeof last === 'string') {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const onPressOperator = (operator: Operators) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default:
        const last = formula[formula.length - 1];
        if (last === Operators.PLUS || last === Operators.MINUS) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {/* number button */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            {/* 0, = button */}
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width, marginTop: 1 }}
            />
            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width, height: width, marginTop: 1 }}
            />
          </View>
        </View>

        <View>
          {/* operation button */}
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width * 2 + 1, marginTop: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
