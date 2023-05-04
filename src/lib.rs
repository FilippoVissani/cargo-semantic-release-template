pub fn sum(a: i32, b: i32) -> i32 {
    a + b
}

pub fn div(a: i32, b: i32) -> i32 {
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sum() {
        assert_eq!(sum(1, 2), 3);
    }

    #[test]
    fn test_div() {
        assert_eq!(div(4, 2), 2);
    }
}