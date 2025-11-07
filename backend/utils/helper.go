package utils

func Contains(aud []string, val string) bool {
	for _, v := range aud {
		if v == val {
			return true
		}
	}
	return false
}