let monthToNumber = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};
export const findDiffDate = (future, today) => {
    let futureSplit = future.split("-");
    let futureYear = futureSplit[0];
    let futureMonth = futureSplit[1];
    let futureDay = futureSplit[2].substring(0, 2);
    let todaySplit = today.split(" ");
    let todayDay = todaySplit[2];
    let todayMonth = monthToNumber[todaySplit[1]];
    let todayYear = todaySplit[3];
    // let diffDay = Math.abs(todayDay - futureDay);
    // let diffMonth = Math.abs(todayMonth - futureMonth);
    // let diffYear = Math.abs(todayYear - futureYear);

    let diffDay = futureDay - todayDay
    let diffMonth = futureMonth - todayMonth
    let diffYear = futureYear - todayYear
    if (diffDay < 0 || diffMonth < 0 || diffYear < 0) {
        return false
    }
    if (diffDay === 0 && diffMonth === 0 && diffYear === 0) {
        let futureTime = future.split("-")[2]
        let futureTimings = futureTime.substring(3,) + ":00"
            return futureTimings.toString()
    }
    let diffDayStr = diffDay.toString();
    let diffMonthStr = diffMonth.toString();
    let diffYearStr = diffYear.toString();
    let final = "";
    final += diffYear !== 0 ? diffYearStr + " year " : "";
    final += diffMonth !== 0 ? diffMonthStr + " month " : "";
    final += diffDay !== 0 ? diffDayStr + " day " : "";
    return final;
}